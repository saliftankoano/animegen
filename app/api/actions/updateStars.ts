"use server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(
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
};
export default async function updateStars(imageUrl: string, stars: number) {
  const supabaseClient = await createClient();
  try {
    await supabaseClient
      .from("image")
      .update({ rating: stars })
      .eq("url", imageUrl);
  } catch (error) {
    console.log("Failed to update image" + error);
  }
}
