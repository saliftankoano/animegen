"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { GenerateImage } from "../api/actions/generateImage";
import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { ImageCard } from "@/components/ImageCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import Image from "next/image";
import Paginations from "@/components/Paginations";
// Define the type for wallpaper
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
  const [prompt, setPrompt] = useState("");
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [imageFeed, setImageFeed] = useState<GeneratedImages[]>([]);
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
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
  const [error, setError] = useState<string>("");

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

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };
  const validatePrompt = (text: string): boolean => {
    // Check for minimum length
    if (text.length < 3) {
      setError("Prompt must be at least 3 characters long");
      return false;
    }

    // Check for maximum length (already handled by maxLength, but good to verify)
    if (text.length > 77) {
      setError("Prompt is too long");
      return false;
    }

    // Check for Spam (repeated characters)
    if (/(.)\1{4,}/.test(text)) {
      setError("Please avoid repeating characters");
      return false;
    }

    // Check for NSFW/inappropriate content patterns
    const inappropriatePatterns = [
      // URLs and spam (existing)
      "http://",
      "https://",
      ".com",
      ".net",
      "www.",
      // NSFW/inappropriate terms
      "nude",
      "naked",
      "nsfw",
      "porn",
      "xxx",
      "sex",
      "explicit",
      "adult",
      "18+",
      "r18",
      "erotic",
      // Body parts/inappropriate terms
      "breast",
      "nipple",
      "genital",
      "penis",
      "vagina",
      "n*de",
      "n*k*d",
      "s*x",
      "p*rn",
    ];

    const normalizedText = text.toLowerCase();

    if (
      inappropriatePatterns.some((pattern) => normalizedText.includes(pattern))
    ) {
      setError("Inappropriate content is not allowed");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedPrompt = prompt.trim();

    // Validate before proceeding
    if (!validatePrompt(trimmedPrompt)) {
      toast.error(error);
      return;
    }

    setIsWidgetOpen(false);
    setIsGenerating(true);
    const getImageUrl = await GenerateImage(trimmedPrompt);

    if (!getImageUrl.success) {
      console.log("Error generating image:");
    } else {
      setGenerationComplete(true);
    }
    setIsGenerating(false);
    setPrompt("");
  };

  useEffect(() => {
    if (generationComplete) {
      toast("Generation successful", {
        description: "Great job! 👏",
      });
    } else {
      toast("Generation unsuccessful", {
        description: "Please try again 🙏😭",
      });
      router.push("/feed");
    }
  }, [generationComplete, router]);

  const handleImageClick = (url: string, prompt: string) => {
    setSelectedImage({ url, prompt });
  };

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
            comment_count={image.comment_count || 0}
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
      <SignedIn>
        <Button
          className="fixed bottom-12 right-12 bg-blue-700 hover:bg-yellow-500 text-white dark:bg-yellow-500 dark:text-black dark:hover:bg-blue-700"
          onClick={() => setIsWidgetOpen(true)}
        >
          Generate 🤩
        </Button>
      </SignedIn>

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="Enter your Wallpaper prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className={`min-h-[100px] bg-muted mt-2 ${
                    error ? "border-red-500" : ""
                  }`}
                  maxLength={77}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
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
