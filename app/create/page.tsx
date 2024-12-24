"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { GenerateImage } from "../api/actions/generateImage";
import { toast } from "sonner";
export default function CreateImage() {
  const [prompt, setPrompt] = useState("");
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
      toast("Generation successful", {
        description: "Great job! 👏",
      });
    } else {
      toast("Generation unsuccessful", {
        description: "Please try again 🙏😭",
      });
      router.push("/create");
    }
  }, [generationComplete, router]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsGenerating(true);

    const imageGenerated = await GenerateImage(prompt);
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
          <label className="my-1  flex items-center">
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
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Giant calamari attacking a ship on the ocean"
            className="w-full"
            maxLength={77}
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
                {prompt || "Your prompt here"}
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
