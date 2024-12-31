"use server";
import { currentUser } from "@clerk/nextjs/server";
export async function GenerateImage(prompt: string) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const username = user?.username || "Gino432";
    const profileimage = user?.imageUrl || username || "rando";
    console.log("User ID from generateImage server side: ", userId);
    if (!user) {
      return Response.json(
        { error: "Unauthorized access from generateImage server side" },
        { status: 401 }
      );
    }
    const response = await fetch("https://www.animegen.io/api/generate", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, username, profileimage, userId }),
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
