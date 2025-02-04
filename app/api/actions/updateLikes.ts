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
export default async function updateLikes(imageUrl: string) {
  const supabaseClient = await createClient();
  const { data, error } = await supabaseClient
    .from("image")
    .select("like_count")
    .eq("url", imageUrl)
    .single();
  const newLikeCount = data?.like_count || 0 + 1;
  if (!error) {
    try {
      await supabaseClient
        .from("image")
        .update("like_count", newLikeCount)
        .eq("url", imageUrl)
        .single();
    } catch (error) {
      console.log("Failed to update image" + error);
    }
  }
}
