"use client";

import Image from "next/image";
//import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Download } from "lucide-react";

interface ImageCardProps {
  imageUrl: string;
  prompt: string;
  username: string;
  profile_url: string;
  likes_count: number;
  onImageClick: (url: string, prompt: string) => void;
}

export function ImageCardProfile({
  imageUrl,
  prompt,
  username,
  profile_url,
  likes_count,
  onImageClick,
}: ImageCardProps) {
  //const router = useRouter();

  // const handleCardClick = () => {
  //   router.push(`/wallpaper/${imageUrl}`);
  // };

  return (
    <Card
      className="overflow-hidden border-2 border-primary cursor-pointer transition-shadow hover:shadow-lg"
      // onClick={handleCardClick}
    >
      <CardContent className="p-0 relative">
        <Image
          src={imageUrl}
          alt={prompt || "Wallpaper"}
          width={500}
          height={650}
          className="w-full h-auto"
          loading="lazy"
          onClick={() => onImageClick(imageUrl, prompt)}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm p-4">
          <p
            className={`text-lg font-bold text-primary-foreground ${
              prompt.length > 20 ? "text-sm" : ""
            }`}
          >
            {prompt}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-card">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={profile_url} alt={username} />
            <AvatarFallback>
              {typeof username === "string"
                ? username.slice(0, 2).toUpperCase()
                : "S"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={`text-foreground hover:text-foreground/80`}
          >
            <Heart className="w-4 h-4 mr-1" fill={"none"} />
            {likes_count}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-foreground/80 ml-auto"
            onClick={async (e) => {
              e.stopPropagation(); // Prevents triggering any parent click events
              try {
                const response = await fetch(imageUrl);
                if (!response.ok) throw new Error("Failed to fetch the image.");

                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = prompt || "download";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Revoke the blob URL after the download is complete
                window.URL.revokeObjectURL(blobUrl);
              } catch (error) {
                console.error("Download failed:", error);
              }
            }}
          >
            <Download className="w-4 h-4 mr-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
