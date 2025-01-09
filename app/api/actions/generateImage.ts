"use server";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function GenerateImage(prompt: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  // Fetch current monthly image generation count

  try {
    const user = await currentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized access from generateImage server side" },
        { status: 401 }
      );
    }

    const userId = user.id;
    const username = user.username;
    const profileimage = user.imageUrl;
    const email = user.emailAddresses[0].emailAddress;
    const bio = user.publicMetadata.bio;

    const { data: mo_img_count } = await supabase
      .from("user")
      .select("mo_img_count")
      .eq("id", user.id)
      .single();
    const response = await fetch("https://www.animegen.io/api/generate", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        username,
        profileimage,
        prompt,
        email,
        bio,
        mo_img_count: mo_img_count || 0,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Image generation failed",
    };
  }
}
