"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
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
export default async function getImageGenerations(user_id: string) {
  const supabase = await createClient();
  const { data: mo_img_count, error } = await supabase
    .from("user")
    .select("mo_img_count")
    .eq("user_id", user_id)
    .single();
  if (error) {
    console.error("Failed to get image generations", error);
    throw error;
  }
  return Number(mo_img_count);
}
