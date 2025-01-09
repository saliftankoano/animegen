import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// SUPABASE INSERTION
const insertImage = async (
  username: string,
  profile_url: string,
  prompt: string,
  url: string,
  on_feed: false
) => {
  const { error } = await supabase.from("image").insert([
    {
      username: username,
      profile_url: profile_url,
      prompt: prompt,
      url: url,
      on_feed: on_feed,
    },
  ]);

  if (error) {
    return error;
  } else {
    console.log("Image inserted:");
    return "success";
  }
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user_id = body?.userId;

  if (!user_id) {
    return NextResponse.json(
      { error: "Unauthorized access from image generation API Layer" },
      { status: 401 }
    );
  }
  const { username, profileimage, email, prompt, bio, mo_img_count } = body;
  try {
    const url = new URL(process.env.GENERATE_URL || "");

    url.searchParams.set("prompt", encodeURIComponent(prompt));

    const timeoutDuration = 60000; // 60 seconds
    const fetchPromise = fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Accept: "image/png",
        "Accept-Encoding": "identity", // Prevents compression
        "Cache-Control": "no-transform", // Add this to prevent transformations
      },
    });

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutDuration)
    );

    // Use Promise.race to handle the fetch and timeout
    const response = (await Promise.race([
      fetchPromise,
      timeoutPromise,
    ])) as Response;

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API response: ", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, error: ${errorText}`
      );
    }
    const imagebuffer = await response.arrayBuffer();
    const filename = `${crypto.randomUUID()}.png`;
    const accessKeyId = process.env.S3_ACCESS_KEY;
    const secretAccessKey = process.env.S3_SECRET_ACCESS;

    // S3 storage + Update monthly image count
    try {
      const s3Client = new S3Client({
        region: process.env.S3_REGION || "",
        credentials: {
          accessKeyId: accessKeyId || "",
          secretAccessKey: secretAccessKey || "",
        },
      });
      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME || "",
        Key: filename,
        Body: Buffer.from(imagebuffer),
        ContentType: "image/png",
        // These parameters prevent S3 from compressing or transforming the image
        CacheControl: "no-transform",
        ContentEncoding: "identity",
        StorageClass: "STANDARD", // Standard storage class
        Metadata: {
          prompt: prompt,
          createdAt: new Date().toISOString(),
          creator: username || "Gino432",
          profileimage: profileimage,
          "original-quality": "true",
          "content-encoding": "identity",
          "cache-control": "no-transform",
        },
      });
      await s3Client.send(command);

      // Generate the public URL
      const imageUrl = `https://${process.env.BUCKET_NAME}.s3.us-east-1.amazonaws.com/${filename}`;
      // Add to Supabase
      const result = await insertImage(
        username,
        profileimage,
        prompt,
        imageUrl,
        false
      );
      if (result == "success") {
        console.log(`Successfully added the image to Supabase`);
      } else {
        console.log("Unsuccessful additon to Supabase");
      }
      // Increment the user image count
      await supabase.from("user").upsert(
        {
          user_id: user_id,
          username: username,
          email_address: email,
          image_url: imageUrl,
          bio: bio || "",
          mo_img_count: mo_img_count + 1,
        },
        { onConflict: "user_id" }
      );
      console.log(`Successfully updated the user's image count`);
      return NextResponse.json({
        success: true,
        message: `Recieved: ${prompt}`,
        imageUrl: imageUrl,
        profileimage: profileimage,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { success: false, error: `Storage operations failed: ${error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Failed request: ${error}` },
      { status: 500 }
    );
  }
}
