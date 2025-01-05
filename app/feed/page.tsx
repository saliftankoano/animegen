"use client";
import { useEffect, useState, useRef } from "react";
import { ImageCard } from "@/components/ImageCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RealtimeChannel } from "@supabase/supabase-js";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { CreateImageCTA } from "@/components/create-image-cta";

export interface GeneratedImages {
  id: string;
  url: string;
  like_count: number;
  comment_count: number;
  profile_url: string;
  username: string;
  prompt: string;
  on_feed: boolean;
}

export default function Home() {
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const username = user?.username;
  const [imageFeed, setImageFeed] = useState<GeneratedImages[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState<number>(1);
  const imagesPerPage = 12;
  const lastImageIndex = currentPage * imagesPerPage;
  const firstImageIndex = lastImageIndex - imagesPerPage;
  const currentImages = imageFeed.slice(firstImageIndex, lastImageIndex);
  const [supabaseClient] = useState(() =>
    createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    })
  );
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    prompt: string;
  } | null>(null);
  const lastImageRef = useRef(null);

  const [lastImageInView, setLastImageInView] = useState(false);
  // useEffect(() => {
  //   // Initial fetch of images
  //   const fetchUserImages = async () => {
  //     const { data, error } = await supabaseClient
  //       .from("image")
  //       .select("*")
  //       .eq("on_feed", true)
  //       .range(0, 5)
  //       .order("created_at", { ascending: false });

  //     if (error) {
  //       console.error("Error fetching images:", error);
  //       return;
  //     }
  //     // Ensure the data is serializable by converting it to plain objects
  //     const serializedData = JSON.parse(JSON.stringify(data || []));
  //     setImageFeed(serializedData);
  //   };
  //   // Set up real-time subscription
  //   let subscription: RealtimeChannel;
  //   const setupSubscription = () => {
  //     subscription = supabaseClient
  //       .channel("image_changes")
  //       .on(
  //         "postgres_changes",
  //         {
  //           event: "*", // Listen to all events (insert, update, delete)
  //           schema: "public",
  //           table: "image",
  //         },
  //         async () => {
  //           // Refetch all images when any change occurs
  //           await fetchUserImages();
  //         }
  //       )
  //       .subscribe();
  //   };

  //   fetchUserImages();
  //   setupSubscription();

  //   // Cleanup subscription when component unmounts
  //   return () => {
  //     subscription?.unsubscribe();
  //   };
  // }, [supabaseClient, username]);
  useEffect(() => {
    const fetchUserImages = async () => {
      const { data, error } = await supabaseClient
        .from("image")
        .select("*")
        .eq("on_feed", true)
        .range(0, 5)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching images:", error);
        return;
      }
      // Ensure the data is serializable by converting it to plain objects
      const serializedData = JSON.parse(JSON.stringify(data || []));
      setImageFeed(serializedData);
    };
    fetchUserImages();
  }, [supabaseClient]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setLastImageInView(entry.isIntersecting);
        console.log(
          "Last Image is now in view! Current length = " + imageFeed.length
        );
      },
      { threshold: 1 }
    );
    if (lastImageRef.current) {
      observer.observe(lastImageRef.current);
    }
  }, [lastImageInView, imageFeed.length]);
  const handleImageClick = (url: string, prompt: string) => {
    setSelectedImage({ url, prompt });
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex justify-between items-center">
        <h1 className="mt-4 text-4xl font-bold text-primary">
          Wall of fame 🤩
        </h1>

        {/* <Button variant="outline" onClick={() => router.push("/create")}>
          Donate
        </Button> */}
      </div>
      <CreateImageCTA />
      {selectedImage && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full p-4">
            <Image
              src={selectedImage.url}
              alt={selectedImage.prompt}
              width={1024}
              height={1024}
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
              unoptimized={true}
              loading="lazy"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentImages.map((image, index) => (
          <div
            key={image.id}
            ref={index === currentImages.length - 1 ? lastImageRef : null}
          >
            {lastImageInView && index == currentImages.length - 1
              ? "Yup this one is the last!"
              : ""}
            <ImageCard
              profile_url={image.profile_url || ""}
              url={image.url || ""}
              prompt={image.prompt || ""}
              username={image.username || ""}
              like_count={image.like_count || 0}
              // comment_count={image.comment_count || 0}
              onImageClick={handleImageClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
