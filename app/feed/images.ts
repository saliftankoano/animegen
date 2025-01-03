import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabaseClient = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});

const getImages = async () => {
  const { data, error } = await supabaseClient
    .from("image")
    .select("*")
    .eq("on_feed", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching images:", error);
    return;
  }
  // Ensure the data is serializable by converting it to plain objects
  const serializedData = JSON.parse(JSON.stringify(data || []));
  return serializedData;
};
const images = await getImages();
const LIMIT = 6;

export const fetchImages = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{ data: []; currentPage: number; nextPage: number | null }> => {
  return {
    data: images.slice(pageParam, pageParam + LIMIT),
    currentPage: pageParam,
    nextPage: pageParam + LIMIT < images.length ? pageParam + LIMIT : null,
  };
};
