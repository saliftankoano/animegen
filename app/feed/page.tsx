"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { generateImage } from "../api/actions/generateImage";
import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { ImageCard } from "@/components/ImageCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { RealtimeChannel } from "@supabase/supabase-js";

// Define the type for wallpaper
interface Wallpaper {
  id: string;
  url: string;
  like_count: number;
  comment_count: number;
  profile_url: string;
  username: string;
  prompt: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [wallpaperFeed, setWallpaperFeed] = useState<Wallpaper[]>([]);
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [supabaseClient] = useState(() =>
    createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    })
  );

  useEffect(() => {
    // Initial fetch of images
    const fetchUserImages = async () => {
      const { data, error } = await supabaseClient
        .from("image")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching images:", error);
        return;
      }
      // Ensure the data is serializable by converting it to plain objects
      const serializedData = JSON.parse(JSON.stringify(data || []));
      setWallpaperFeed(serializedData);
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
  }, [supabaseClient]);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsWidgetOpen(false);
    setIsGenerating(true);
    const getImageUrl = await generateImage(prompt);

    if (!getImageUrl.success) {
      console.log("Error generating image:");
    } else {
      setIsGenerating(false);
      setGenerationComplete(true);
    }
    setPrompt("");
  };

  useEffect(() => {
    if (generationComplete) {
      router.push("/feed");
    }
  }, [generationComplete, router]);

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <h1 className="mt-4 text-4xl font-bold text-primary">Wall of fame 🤩</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallpaperFeed.map((wallpaper) => (
          <ImageCard
            key={wallpaper.id}
            profile_url={wallpaper.profile_url || ""}
            url={wallpaper.url || ""}
            prompt={wallpaper.prompt || ""}
            username={wallpaper.username || ""}
            like_count={wallpaper.like_count || 0}
            comment_count={wallpaper.comment_count || 0}
          />
        ))}
      </div>
      <SignedIn>
        <Button
          className="fixed bottom-12 right-12 bg-black hover:bg-yellow-500 text-white"
          onClick={() => setIsWidgetOpen(true)}
        >
          Generate
        </Button>
      </SignedIn>

      {isWidgetOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary">
                  Wallpaper Magic
                </h2>
                <Button variant="ghost" onClick={() => setIsWidgetOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="Enter your Wallpaper prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] bg-muted"
                />
                <div className="flex justify-end items-center space-x-2">
                  {/* <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  /> */}
                  {/* <label htmlFor="image-upload" className="cursor-pointer">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                    </Button>
                  </label>
                  {image && (
                    <span className="text-sm text-muted-foreground">
                      {image.name}
                    </span>
                  )} */}
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-yellow-500"
                  >
                    Generate Wallpaper
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
