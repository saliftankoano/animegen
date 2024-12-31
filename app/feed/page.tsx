"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { ImageCard } from "@/components/ImageCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Paginations from "@/components/Paginations";
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
  const username = user?.username;
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [imageFeed, setImageFeed] = useState<GeneratedImages[]>([]);
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

  useEffect(() => {
    // Initial fetch of images
    const fetchUserImages = async () => {
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
      setImageFeed(serializedData);
    };
    // Set up real-time subscription
    let subscription: RealtimeChannel;
    const setupSubscription = () => {
      subscription = supabaseClient
        .channel("image_changes")
        .on(
          "postgres_changes",
          {
            event: "*", // Listen to all events (insert, update, delete)
            schema: "public",
            table: "image",
          },
          async () => {
            // Refetch all images when any change occurs
            await fetchUserImages();
          }
        )
        .subscribe();
    };

    fetchUserImages();
    setupSubscription();

    // Cleanup subscription when component unmounts
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabaseClient, username]);

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
              priority
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentImages.map((image) => (
          <ImageCard
            key={image.id}
            profile_url={image.profile_url || ""}
            url={image.url || ""}
            prompt={image.prompt || ""}
            username={image.username || ""}
            like_count={image.like_count || 0}
            // comment_count={image.comment_count || 0}
            onImageClick={handleImageClick}
          />
        ))}
      </div>
      <Paginations
        images={imageFeed}
        imagesPerPage={imagesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {isWidgetOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary">
                  Describe your Image
                </h2>
                <Button variant="ghost" onClick={() => setIsWidgetOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="my-1  flex items-center">
                <p className="text-md text-primary">
                  Charater limit:{" "}
                  <span className="text-muted-foreground">
                    <span
                      className={`${
                        prompt.length > 70
                          ? "text-red-500"
                          : prompt.length > 60
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                    >
                      {prompt.length}
                    </span>
                    /77
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
