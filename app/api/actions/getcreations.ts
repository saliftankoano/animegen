"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export async function getCreations(username: string) {
  const cookieStore = await cookies();
  const supabaseClient = createServerClient(
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
  const { data, error } = await supabaseClient
    .from("images_created")
    .select("*")
    .eq("username", username)
    .single();
  if (error) {
    console.error("Error updating creations:", error);
  }
  console.log("Server Action: Creations updated successfully");
  return { success: true, creations: data?.creations };
}
