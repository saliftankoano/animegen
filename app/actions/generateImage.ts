"use server";
import { currentUser } from "@clerk/nextjs/server";

export async function generateImage(prompt: string) {
  try {
    const user = await currentUser();
    const username = user?.username || "Gino432";
    const profileimage = user?.imageUrl || username || "rando";
    console.log(profileimage + " in generateImage");
    const response = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, username, profileimage }),
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
