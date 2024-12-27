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
export default async function updateImageOnFeed(imageUrl: string) {
  const supabaseClient = await createClient();
  const { error } = await supabaseClient
    .from("image")
    .update({ on_feed: true })
    .eq("url", imageUrl)
    .single();
  if (error) {
    console.log("Failed to update image" + error);
    return { success: false };
  } else {
    return { success: true };
  }
}
