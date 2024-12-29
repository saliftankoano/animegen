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
  const [error, setError] = useState("");
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

    /**
     * NSFW/inappropriate content patterns
     * Will be improved in the future with LLM moderation
     */
    const inappropriatePatterns = [
      // URLs and spam (existing)
      "http://",
      "https://",
      ".com",
      ".net",
      "www.",
      // NSFW/inappropriate terms
      "no clothes*",
      "undressed",
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
      "anus",
      "dick",
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
      setError("Do better! No NSFW content allowed 🚫");
      return false;
    }

    setError("");
    return true;
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validatePrompt(prompt)) {
      toast.error("Invalid prompt, please try again " + error);
      return;
    }
    // Begin normal generation process
    setIsGenerating(true);
    const trimmedPrompt = prompt.trim();
    const imageGenerated = await GenerateImage(trimmedPrompt);
    console.log(imageGenerated);
    if (imageGenerated) {
      setGeneratedImage(imageGenerated);
      setGeneratedImageUrl(imageGenerated.imageUrl);
      setIsGenerating(false);
      toast.success("Your Image was successfully generated");
    } else {
      setIsGenerating(false);
      toast.success("Error: Your Image was not generated.");
    }
  };
  const handleAddToFeed = async () => {
    const { success } = await updateImageOnFeed(generatedImageUrl || "");
    if (success) {
      toast.success("Image successfully Posted to the feed");
      router.push("/feed");
    } else {
      toast.error("Your Image was not posted to the feed");
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
                    prompt.length > 295
                      ? "text-red-500"
                      : prompt.length >= 290
                      ? "text-orange-500"
                      : "text-green-500"
                  }`}
                >
                  {prompt.length}
                </span>
                /300
              </span>
            </p>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Textarea
            id="prompt"
            className="w-full mt-2"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Giant calamari attacking a ship on the ocean"
            maxLength={300}
          />
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <Image
              className="w-[100%] h-[80vh]"
              src={
                generatedImageUrl ||
                process.env.NEXT_PUBLIC_DEFAULT_IMAGE! ||
                "/dawg.png"
              }
              alt={prompt || "Meme preview"}
              loading="eager"
              width={250}
              height={250}
              unoptimized={true}
              priority
              quality={100}
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
              onClick={handleAddToFeed}
              className="ml-[1%] w-[49%] hover:bg-green-500"
            >
              Post
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
