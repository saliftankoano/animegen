"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { GenerateImage } from "../api/actions/generateImage";
import { toast } from "sonner";
import updateImageOnFeed from "../api/actions/addToFeed";
export default function CreateImage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsGenerating(true);

    const imageGenerated = await GenerateImage(prompt);
    console.log(imageGenerated);
    if (imageGenerated) {
      setGeneratedImage(imageGenerated);
      setGeneratedImageUrl(imageGenerated.imageUrl);
      setIsGenerating(false);
      toast("Success!", {
        description: "Your Image was successfully generated",
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismiss"),
        },
      });
    } else {
      setIsGenerating(false);
      toast("Failed!", {
        description: "Your Image was not generated.",
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismiss"),
        },
      });
    }
  };
  const handleAddToFeed = async () => {
    const { success } = await updateImageOnFeed(generatedImageUrl || "");
    if (success) {
      router.push("/feed");
      return;
    }

    toast("Feed Error", {
      description: "Your image was not added to the feed. Please try again.",
      action: {
        label: "Dismiss",
        onClick: () => console.log("Dismiss"),
      },
    });
  };

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
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
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <Image
              src={generatedImageUrl || "/dawg.png"}
              alt="Meme preview"
              loading="lazy"
              width={250}
              height={250}
              className="w-[100%] h-[80vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <p className="text-lg font-bold">
                {prompt || "Your prompt here"}
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="w-full">
          <Button
            type="submit"
            className={`${generatedImage ? "w-[49%] mr-[1%]" : "w-full"}`}
          >
            {generatedImage ? "Generate Again" : "Generate 🤩"}
          </Button>
          {generatedImage && (
            <Button
              onClick={() => handleAddToFeed}
              className="ml-[1%] w-[49%] hover:bg-green-500"
            >
              Add To Feed
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
