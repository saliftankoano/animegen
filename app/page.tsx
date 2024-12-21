"use client";

import { useState } from "react";
import { MemeCard } from "@/components/MemeCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { generateImage } from "./actions/generateImage";

const wallpaperFeed = [
  {
    id: 1,
    imageUrl:
      "https://ik.imagekit.io/engineerbf24/dragon.png?updatedAt=1734708472086",
    caption: "When the wallpaper finally works",
    creator: "WallpaperNinja",
    createdAt: "2023-06-15",
    likes: 1337,
    comments: 42,
  },
  {
    id: 2,
    imageUrl:
      "https://ik.imagekit.io/engineerbf24/dragon.png?updatedAt=1734708472086",
    caption: "Wallpapering at 3 AM",
    creator: "NightOwlWallpaper",
    createdAt: "2023-06-14",
    likes: 2048,
    comments: 128,
  },
  {
    id: 3,
    imageUrl:
      "https://ik.imagekit.io/engineerbf24/dragon.png?updatedAt=1734708472086",
    caption: 'When the client says "small change" to the wallpaper',
    creator: "ProjectManagerWallpaper",
    createdAt: "2023-06-13",
    likes: 4096,
    comments: 256,
  },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

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

    wallpaperFeed.push({
      id: wallpaperFeed.length + 1,
      imageUrl: getImageUrl.imageUrl,
      caption: prompt,
      creator: "Wallpapi",
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
    });

    console.log("Image URL:", getImageUrl.imageUrl);
    setPrompt("");
    setImage(null);
    setIsWidgetOpen(false);
  };

  return (
    <div className="space-y-8 relative">
      <h1 className="mt-4 text-4xl font-bold text-primary">Wall of fame 🤩</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallpaperFeed.map((wallpaper) => (
          <MemeCard
            creatorAvatar={wallpaperFeed[0].imageUrl}
            key={wallpaper.id}
            {...wallpaper}
            imageUrl={wallpaper.imageUrl}
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
