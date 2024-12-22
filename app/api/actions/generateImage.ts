"use server";
import { currentUser } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";

function UseClerkAuth() {
  const { getToken } = useAuth();
  return getToken;
}

export async function generateImage(prompt: string) {
  const getToken = UseClerkAuth();
  const token = await getToken();
  console.log("JWT Token:", token); // Show Token

  // Retrieve Clerk's JWT
  const jwttoken = await getToken();
  if (!jwttoken) {
    return { error: "Token not found", status: 401 };
  }

  try {
    const user = await currentUser();
    const username = user?.username || "Gino432";
    const profileimage = user?.imageUrl || username || "rando";
    console.log(profileimage + " in generateImage");
    const response = await fetch("https://www.genwalls.com/api/generate", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        "Content-Type": "application/json",
        "X-Clerk-JWT": jwttoken,
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
