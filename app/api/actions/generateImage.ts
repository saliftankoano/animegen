"use server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export async function generateImage(prompt: string, currentCreations: number) {
  const cookieStore = await cookies();
  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            cookieStore.set(cookie.name, cookie.value, cookie);
          });
        },
      },
    }
  );
  try {
    const user = await currentUser();
    const username = user?.username || "Gino432";
    const profileimage = user?.imageUrl || username || "rando";
    const response = await fetch("https://www.genwalls.com/api/generate", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, username, profileimage }),
    });
    const data = await response.json();
    try {
      const { error } = await client
        .from("images_created")
        .upsert([{ username, creations: currentCreations + 1 }], {
          onConflict: "username",
        });
      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    } catch (error) {
      console.log(error);
    }
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Image generation failed",
    };
  }
}
