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
export default async function getPlan(user_id: string) {
  const supabaseClient = await createClient();
  const { data, error } = await supabaseClient
    .from("user")
    .select("plan")
    .eq("user_id", user_id)
    .single();
  if (error) {
    console.error("Failed to get plan", error);
    throw error;
  }
  return data.plan;
}
