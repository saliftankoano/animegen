"use client";

import { useState } from "react";
import Image from "next/image";
//import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Download } from "lucide-react";

interface ImageCardProps {
  imageUrl: string;
  caption: string;
  creator: string;
  creatorAvatar: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export function ImageCard({
  imageUrl,
  caption,
  creator,
  creatorAvatar,
  createdAt,
  likes,
  comments,
}: ImageCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  //const router = useRouter();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

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
          alt={caption || "Wallpaper"}
          width={500}
          height={500}
          className="w-full h-auto"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm p-4">
          <p className="text-lg font-bold text-primary-foreground">{caption}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-card">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={creatorAvatar} alt={creator} />
            <AvatarFallback>
              {typeof creator === "string"
                ? creator.slice(0, 2).toUpperCase()
                : "Gino432"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{creator}</p>
            <p className="text-xs text-muted-foreground">{createdAt}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={`text-foreground hover:text-foreground/80 ${
              isLiked ? "text-red-500 hover:text-red-600" : ""
            }`}
            onClick={handleLike}
          >
            <Heart
              className="w-4 h-4 mr-1"
              fill={isLiked ? "currentColor" : "none"}
            />
            {likeCount}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-foreground/80"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            {comments}
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
                link.download = caption || "download";
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
