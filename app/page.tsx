"use client";

import { useEffect, useState } from "react";
import { MemeCard } from "@/components/MemeCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { generateImage } from "./actions/generateImage";
import { getImages } from "./actions/getimages";

// Define the type for wallpaper
interface Wallpaper {
  key: string;
  url: string;
  metadata: {
    prompt: string;
    createdAt: string;
    creator: string;
  };
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [wallpaperFeed, setWallpaperFeed] = useState<Wallpaper[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Wallpaper prompt submitted:", { prompt, image });

    const getImageUrl = await generateImage(prompt);

    if (!getImageUrl.success) {
      console.log("Error generating image:", getImageUrl.error);
    } else {
      console.log(getImageUrl.imageUrl);
    }

    console.log("Image URL:", getImageUrl.imageUrl);
    setPrompt("");
    setImage(null);
    setIsWidgetOpen(false);
  };

  const fetchImages = async () => {
    try {
      const data = await getImages();
      if (data.success) {
        setWallpaperFeed(data.images);
      } else {
        console.log(data.error || "Failed to fetch images.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchImages();
    const interval = setInterval(fetchImages, 6000); // every 6 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="space-y-8 relative">
      <h1 className="mt-4 text-4xl font-bold text-primary">Wall of fame 🤩</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallpaperFeed.map((wallpaper, index) => (
          <MemeCard
            key={index}
            creatorAvatar={wallpaper.metadata.creator}
            imageUrl={wallpaper.url}
            caption={wallpaper.metadata.prompt}
            createdAt={wallpaper.metadata.createdAt}
            creator={wallpaper.metadata.creator}
            id={index}
            likes={3200}
            comments={3}
          />
        ))}
      </div>
      <Button
        className="fixed bottom-4 right-4 bg-black hover:bg-accent/90 text-white"
        onClick={() => setIsWidgetOpen(true)}
      >
        Generate
      </Button>
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
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
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
                  )}
                  <Button
                    type="submit"
                    className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90"
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
