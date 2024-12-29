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
                    prompt.length > 250
                      ? "text-red-500"
                      : prompt.length > 240
                      ? "text-orange-500"
                      : "text-green-500"
                  }`}
                >
                  {prompt.length}
                </span>
                /250
              </span>
            </p>
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Giant calamari attacking a ship on the ocean"
            className="w-full"
            maxLength={250}
          />
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <Image
              src={
                generatedImageUrl ||
                process.env.NEXT_PUBLIC_DEFAULT_IMAGE! ||
                "/dawg.png"
              }
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
