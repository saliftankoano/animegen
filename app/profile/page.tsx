"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UpdateProfileDescription } from "@/app/api/actions/updateProfileDescription";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImageCardProfile } from "@/components/ImageCardProfile";
import Image from "next/image";
// Add interface for image type
interface UserImage {
  id: string;
  user_id: string;
  url: string;
  prompt: string;
  username: string;
  profile_url: string;
  likes_count: number;
  comments_count: number;
}

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [userImages, setUserImages] = useState<UserImage[]>([]);
  const { user } = useUser();
  const username = user?.username || "";
  const userId = user?.id || "";
  const imageUrl = user?.imageUrl || "/join.png";
  const [bio, setBio] = useState(
    user?.publicMetadata?.bio ? String(user?.publicMetadata?.bio) : "No bio yet"
  );
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    prompt: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserImages = async () => {
      if (!userId) return;

      const supabase = createClientComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      });

      const { data, error } = await supabase
        .from("image")
        .select("*")
        .eq("username", username)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching images:", error);
        return;
      }

      setUserImages(data || []);
    };

    fetchUserImages();
  }, [userId, username]);

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await UpdateProfileDescription(userId, bio);
      if (result.success) {
        setOpen(false);
        return;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageClick = (url: string, prompt: string) => {
    setSelectedImage({ url, prompt });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Avatar className="mb-4">
            <AvatarImage src={imageUrl || "/dawg.png"} />
            <AvatarFallback>{username?.charAt(0) || "G"}</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold text-primary mb-2">
            {username || "Gino432"}
          </h1>
          <p className="text-muted-foreground mb-4">{bio}</p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="text-center">
              <p className="font-bold text-foreground">{userImages.length}</p>
              <p className="text-sm text-muted-foreground">Creations</p>
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save changes
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold text-primary text-center">
        My Creations
      </h2>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full p-4">
            <Image
              src={selectedImage.url}
              alt={selectedImage.prompt}
              width={1024}
              height={1024}
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userImages.length > 0 ? (
          userImages.map((image) => (
            <ImageCardProfile
              key={image.id}
              imageUrl={image.url}
              prompt={
                image?.prompt.length < 80
                  ? image?.prompt
                  : image?.prompt.slice(0, 80) + "..."
              }
              username={image.username}
              profile_url={image.profile_url}
              likes_count={image?.likes_count || 0}
              onImageClick={handleImageClick}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-muted-foreground">
            No images created yet
          </p>
        )}
      </div>
    </div>
  );
}
