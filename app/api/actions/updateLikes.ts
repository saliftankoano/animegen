"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
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

export default async function UpdateLikes(url: string, username: string) {
  const supabaseClient = await createClient();
  const { data, error } = await supabaseClient
    .from("image")
    .select("like_count")
    .eq("url", url)
    .eq("username", username)
    .single();

  if (error) throw error;
  else if (data) return data.like_count;
}
