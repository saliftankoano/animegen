"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { GenerateImage } from "@/app/api/actions/generateImage";
import { toast } from "sonner";
import updateImageOnFeed from "@/app/api/actions/addToFeed";
import { AlertCircle, Send, ImagePlus, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GenerationTips } from "@/components/GenerationTips";
export default function CreateImage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const router = useRouter();
  const [error, setError] = useState("");

  const validatePrompt = (text: string): boolean => {
    if (text.length < 3) {
      setError("Prompt must be at least 3 characters long");
      return false;
    }
    if (text.length > 300) {
      setError("Prompt is too long");
      return false;
    }
    if (/(.)\1{4,}/.test(text)) {
      setError("Please avoid repeating characters");
      return false;
    }

    const inappropriatePatterns = [
      "http://",
      "https://",
      ".com",
      ".net",
      "www.",
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
      toast.error(`Invalid prompt: ${error}`);
      return;
    }
    setIsGenerating(true);
    const trimmedPrompt = prompt.trim();
    const imageGenerated = await GenerateImage(trimmedPrompt);
    if (imageGenerated) {
      setGeneratedImageUrl(imageGenerated.imageUrl);
      toast.success("Your image was successfully generated");
    } else {
      toast.error("Error: Your image was not generated");
    }
    setIsGenerating(false);
  };

  const handleAddToFeed = async () => {
    if (!generatedImageUrl) return;
    const { success } = await updateImageOnFeed(generatedImageUrl);
    if (success) {
      toast.success("Image successfully posted to the feed");
      router.push("/feed");
    } else {
      toast.error("Your image was not posted to the feed");
    }
  };
  const downloadImage = async (url: string) => {
    // Create a shorter, cleaner filename
    const words = prompt?.split(" ") || ["image"];
    const shortName = words.slice(0, 3).join("_").toLowerCase();
    const sanitizedName = shortName.replace(/[^a-z0-9_]/g, "");

    try {
      const response = await fetch(url, {
        headers: {
          Accept: "image/png",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const imageBlob = new Blob([blob], { type: "image/png" });
      const blobUrl = window.URL.createObjectURL(imageBlob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${sanitizedName}.png`;
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback
      window.open(url, "_blank");
    }
  };
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Write it into existence! ✍️
      </h1>
      <GenerationTips />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm font-medium">
            <span>Your Prompt</span>
            <span
              className={`${
                prompt.length > 295
                  ? "text-red-500"
                  : prompt.length >= 290
                  ? "text-orange-500"
                  : "text-green-500"
              }`}
            >
              {prompt.length}/300
            </span>
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Giant calamari attacking a ship on the ocean"
            maxLength={300}
            className="h-24 resize-none"
          />
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="flex space-x-4">
          <Button type="submit" className="flex-1" disabled={isGenerating}>
            {isGenerating ? (
              <Loading />
            ) : (
              <>
                <ImagePlus className="mr-2 h-4 w-4" />
                {generatedImageUrl ? "Generate Again" : "Generate 🤩"}
              </>
            )}
          </Button>
          {generatedImageUrl && (
            <Button
              onClick={handleAddToFeed}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              <Send className="mr-2 h-4 w-4" />
              Post to Feed
            </Button>
          )}
        </div>
      </form>
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative h-[50vh]">
          {generatedImageUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background/90"
              onClick={() => downloadImage(generatedImageUrl)}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          )}
          <Image
            src={
              generatedImageUrl ||
              process.env.NEXT_PUBLIC_DEFAULT_IMAGE! ||
              "/dawg.png"
            }
            alt={prompt || "Generated image preview"}
            layout="fill"
            objectFit="contain"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <p className="text-sm font-bold truncate">
              {prompt || "Your prompt here"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
