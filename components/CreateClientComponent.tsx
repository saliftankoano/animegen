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
import { AlertCircle, Send, ImagePlus, Download, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GenerationTips } from "@/components/GenerationTips";
import { StarRating } from "@/components/StarRating";
import { JoinButton } from "@/components/JoinButton";
import { useUser } from "@clerk/nextjs";

export default function CreateClientComponent() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [showRating, setShowRating] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const validatePrompt = (text: string): boolean => {
    if (text.length < 3) {
      setError("Prompt must be at least 3 characters long");
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

    if (!user) {
      return Response.json(
        { error: "Unauthorized access from create client component" },
        { status: 401 }
      );
    }

    setIsGenerating(true);
    const trimmedPrompt = prompt.trim();
    const imageGenerated = await GenerateImage(trimmedPrompt);
    if (imageGenerated) {
      setGeneratedImageUrl(imageGenerated.imageUrl);
      toast.success("Your image was successfully generated");
      setShowRating(true);
    } else {
      toast.error("Error: Your image was not generated");
    }
    setIsGenerating(false);
  };

  const handleAddToFeed = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!generatedImageUrl) return;
    setIsPosting(true);
    const { success } = await updateImageOnFeed(generatedImageUrl);
    if (success) {
      toast.success("Image successfully posted to the feed");
      router.push("/feed");
    } else {
      toast.error("Your image was not posted to the feed");
    }
    setIsPosting(false);
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

  const handleRating = async (rating: number) => {
    // TODO: Implement the logic to save the rating
    console.log(`Image rated: ${rating} stars`);
    toast.success(
      `Thank you for your feedback! You rated the image ${rating} stars.`
    );
    setShowRating(false);
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center mt-[25vh] mb-4">
            You ain&apos;t slick, you have to join <br /> to create an image! 😉
          </h1>
          <JoinButton />
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Write it into existence! ✍️
      </h1>
      <GenerationTips />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm font-medium">
            <span className="text-green-500">Your Prompt</span>
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
            placeholder="Isagi from Bluelock facing the camera with his tongue out with a demonic look."
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
          {isGenerating ? (
            <div
              className="w-full flex flex-col items-center justify-center
                  bg-card dark:bg-card-dark p-6 rounded-md shadow-lg"
            >
              <Loading />
            </div>
          ) : (
            <Button type="submit" className="flex-1" disabled={isGenerating}>
              <>
                <ImagePlus className="mr-2 h-4 w-4" />
                {generatedImageUrl ? "Generate Again" : "Generate 🤩"}
              </>
            </Button>
          )}

          {generatedImageUrl && (
            <Button
              onClick={handleAddToFeed}
              className="flex-1 bg-green-500 hover:bg-green-600"
              disabled={isPosting}
            >
              {isPosting ? (
                <Loader2 />
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Post to Feed
                </>
              )}
            </Button>
          )}
        </div>
        {showRating && (
          <Card>
            <CardContent className="p-6 flex flex-col items-center space-y-4">
              <h2 className="text-xl font-semibold">
                How would you rate this image?
              </h2>
              <StarRating onRate={handleRating} />
              <p className="text-sm text-green-500">
                Your feedback helps us improve our image generation!
              </p>
            </CardContent>
          </Card>
        )}
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
