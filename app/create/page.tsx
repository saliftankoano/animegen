"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { generateImage } from "../api/actions/generateImage";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useUser } from "@clerk/nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CreateImage() {
  const { user } = useUser();
  const username = user?.username;
  const supabaseClient = createClientComponentClient();
  const [caption, setCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const router = useRouter();
  // const [imageUrl, setImageUrl] = useState(
  //   process.env.DEFAULT_IMAGE_URL || null
  // );

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => setImageUrl(e.target?.result as string);
  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    if (generationComplete) {
      router.push("/feed");
    }
  }, [generationComplete, router]);
  const [currentCreations, setCurrentCreations] = useState(0);
  const fetchCreations = async () => {
    const { data, error } = await supabaseClient
      .from("images_created")
      .select("*")
      .eq("username", username);
    if (error) {
      setCurrentCreations(0);
    } else {
      setCurrentCreations(data?.[0]?.creations);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    fetchCreations();
    setIsGenerating(true);

    const imageGenerated = await generateImage(caption, currentCreations);

    if (imageGenerated) {
      setIsGenerating(false);
      setGenerationComplete(true);
    } else {
      setIsGenerating(false);
      console.error("JWT Token is null");
    }
  };

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pt-14">
      <h1 className="text-3xl font-bold">Write it, into existence! ✍️</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="caption" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter your description"
            className="w-full"
          />
        </div>
        {/* <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Upload Image
          </label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div> */}
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <Image
              src={"/dawg.png"}
              alt="Meme preview"
              loading="lazy"
              width={500}
              height={500}
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <p className="text-lg font-bold">
                {caption || "Your caption here"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Button type="submit" className="w-full">
          Generate 🤩
        </Button>
      </form>
    </div>
  );
}
