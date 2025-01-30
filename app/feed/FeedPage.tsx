"use client";
import { useEffect, useRef, useState } from "react";
import { ImageCard } from "@/components/ImageCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RealtimeChannel } from "@supabase/supabase-js";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { CreateImageCTA } from "@/components/create-image-cta";
import { useInView } from "react-intersection-observer";
import { Header } from "@/components/landing/Header";

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

export default function FeedPage() {
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const username = user?.username;
  const [imageFeed, setImageFeed] = useState<GeneratedImages[]>([]);
  const IMAGES_PER_FETCH = 6;
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
  const { ref, inView } = useInView({
    threshold: 0.4,
    delay: 100,
    triggerOnce: true,
  });
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);
  // Fetch images from the database
  useEffect(() => {
    const fetchUserImages = async (start: number, end: number) => {
      const { data, error } = await supabaseClient
        .from("image")
        .select("*")
        .eq("on_feed", true)
        .range(start, end)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching images:", error);
        return;
      }
      const { count } = await supabaseClient
        .from("image")
        .select("*", { count: "exact", head: true })
        .eq("on_feed", true)
        .lt("created_at", data?.[data.length - 1]?.created_at || "");

      if (count === 0) {
        setHasMore(false);
      }
      // Ensure the data is serializable by converting it to plain objects
      const serializedData = JSON.parse(JSON.stringify(data || []));
      if (imageFeed.length == 0) {
        setImageFeed(serializedData);
      } else {
        setImageFeed((prevImages) => [...prevImages, ...serializedData]);
      }
    };
    if (imageFeed.length == 0) {
      fetchUserImages(0, IMAGES_PER_FETCH - 1);
    } else if (inView && hasMore) {
      console.log(
        "Last Image is now in view! Current length = " + imageFeed.length
      );
      const nextStartIndex = imageFeed.length;
      fetchUserImages(nextStartIndex, nextStartIndex + IMAGES_PER_FETCH - 1);
    }
  }, [inView, imageFeed.length, supabaseClient, hasMore]);

  // Check if the observer ref or imageFeed length changed and update the observer ref
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current = null;
    }
    if (imageFeed.length > 0) {
      observerRef.current = document.querySelector(
        `[data-id="${imageFeed.length - 1}"]`
      );
    }
    if (observerRef.current) {
      ref(observerRef.current);
    }
  }, [imageFeed.length, ref]);
  // Handle new image inserted into the feed
  useEffect(() => {
    const channel = supabaseClient
      .channel("image_feed_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "image",
          filter: "on_feed=eq.true",
        },
        (payload) => {
          console.log("New image inserted into feed");
          setImageFeed((prev) => {
            const newImage = JSON.parse(JSON.stringify(payload.new));
            return [newImage, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabaseClient]);
  const handleImageClick = (url: string, prompt: string) => {
    setSelectedImage({ url, prompt });
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 relative">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              Community Gallery
            </h1>
            <p className="text-muted-foreground">
              Discover and get inspired by amazing AI-generated artwork from our
              community
            </p>
          </div>
        </div>

        <CreateImageCTA />

        {selectedImage && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[100]"
            onClick={() => setSelectedImage(null)}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imageFeed.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              data-id={index}
              ref={index === imageFeed.length - 1 ? observerRef : null}
              className="transform transition-transform hover:scale-[1.02]"
            >
              <ImageCard
                profile_url={image.profile_url || ""}
                url={image.url || ""}
                prompt={image.prompt || ""}
                username={image.username || ""}
                like_count={image.like_count || 0}
                onImageClick={handleImageClick}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
