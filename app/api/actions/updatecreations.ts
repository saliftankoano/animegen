"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export async function UpdateCreations(
  username: string,
  currentCreations: number
) {
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
  const { error } = await supabaseClient
    .from("images_created")
    .upsert([{ username, creations: currentCreations + 1 }], {
      onConflict: "username",
    });
  if (error) {
    console.error("Error updating creations:", error);
    return { success: false, message: "Error updating creations" };
  }
  console.log("Server Action: Creations updated successfully");
  return { success: true, message: "creations updated" };
}
