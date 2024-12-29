"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Download } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { RealtimeChannel } from "@supabase/supabase-js";
type Image = {
  url: string;
  username: string;
  like_count: number;
};

interface ImageCardProps {
  url: string;
  prompt: string;
  username: string;
  profile_url: string;
  like_count: number;
  comment_count: number;
  onImageClick: (url: string, prompt: string) => void;
}

export function ImageCard({
  url,
  prompt,
  username,
  profile_url,
  like_count,
  comment_count,
  onImageClick,
}: ImageCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like_count);
  const [supabaseClient] = useState(() =>
    createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    })
  );
  useEffect(() => {
    const fetchLikeCount = async () => {
      const { data, error } = await supabaseClient
        .from("image")
        .select("like_count")
        .eq("url", url)
        .eq("username", username)
        .single();
      if (error) throw error;
      setLikeCount(data.like_count);
    };
    // Set up real-time subscription
    let subscription: RealtimeChannel;
    const setupSubscription = () => {
      subscription = supabaseClient
        .channel("like_updates")
        .on(
          "postgres_changes",
          {
            event: "*", // Listen to all events (insert, update, delete)
            schema: "public",
            table: "image",
            filter: `url=eq.${url}`,
          },
          async () => {
            // Refetch like count when changes occur
            await fetchLikeCount();
          }
        )
        .subscribe();
    };
    fetchLikeCount();
    setupSubscription();
    // Cleanup subscription when component unmounts
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabaseClient, url, username]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { error, data } = await supabaseClient
        .from("image")
        .update({ like_count: isLiked ? likeCount - 1 : likeCount + 1 })
        .eq("url", url)
        .eq("username", username)
        .select()
        .single();

      if (error) throw error;
      setIsLiked(!isLiked);

      if (error) throw error;
      else if (data) setLikeCount((data as Image).like_count);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleCardClick = () => {
    onImageClick(url, prompt);
  };

  return (
    <Card
      className="overflow-hidden border-2 border-primary cursor-pointer transition-shadow hover:shadow-lg"
      onClick={handleCardClick}
    >
      <CardContent className="p-0 relative">
        <Image
          src={url}
          alt={prompt}
          width={400}
          height={400}
          className="w-full h-auto"
          unoptimized={true}
          loading="eager"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm p-4">
          <p
            className={`text-lg font-bold text-primary-foreground ${
              prompt?.length > 20 ? "text-sm" : ""
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
                : "Gino432"}
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
            {comment_count}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-foreground/80 ml-auto"
            onClick={async (e) => {
              e.stopPropagation(); // Prevents triggering any parent click events
              try {
                const response = await fetch(url);
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
