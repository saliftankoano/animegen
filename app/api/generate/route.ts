import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;
    console.log(prompt);
    const url = new URL(
      "https://saliftankoano--genwalls-inference-generate.modal.run"
    );
    url.searchParams.set("prompt", encodeURIComponent(prompt));
    console.log(url.toString());

    // Set a timeout duration (e.g., 60 seconds)
    const timeoutDuration = 60000; // 60 seconds
    const fetchPromise = fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Accept: "image/png",
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
      const errorText = await response.text(); // Await the text to get the error message
      console.error("API response: ", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, error: ${errorText}`
      );
    }

    const imagebuffer = await response.arrayBuffer();
    const filename = `${crypto.randomUUID()}.png`;
    const accessKeyId = process.env.S3_ACCESS_KEY;
    const secretAccessKey = process.env.S3_SECRET_ACCESS;
    try {
      // S3 storage
      const s3Client = new S3Client({
        region: "us-east-1",
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
        Metadata: {
          prompt: prompt,
        },
      });
      await s3Client.send(command);

      // Generate the public URL
      const imageUrl = `https://${process.env.BUCKET_NAME}.s3.us-east-1.amazonaws.com/${filename}`;
      console.log(imageUrl);

      return NextResponse.json({
        success: true,
        message: `Recieved: ${prompt}`,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { success: false, error: `Failed request: ${error}` },
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
