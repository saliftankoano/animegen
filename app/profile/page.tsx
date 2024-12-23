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
import { ImageCard } from "@/components/ImageCard";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateProfileDescription } from "../api/actions/updateProfileDescription";
import { useState } from "react";

const userImages = [
  {
    id: 1,
    imageUrl: "/dawg.png",
    caption: "When the code finally works",
    creator: "MemeMaster",
    creatorAvatar: "/dawg.png",
    createdAt: "2023-06-15",
    likes: 1337,
    comments: 42,
  },
  {
    id: 2,
    imageUrl: "/dawg.png",
    caption: "Debugging at 3 AM",
    creator: "MemeMaster",
    creatorAvatar: "/dawg.png",
    createdAt: "2023-06-14",
    likes: 2048,
    comments: 128,
  },
  {
    id: 3,
    imageUrl: "/dawg.png",
    caption: 'When the client says "small change"',
    creator: "MemeMaster",
    creatorAvatar: "/dawg.png",
    createdAt: "2023-06-13",
    likes: 4096,
    comments: 256,
  },
];

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const username = user?.username || "";
  const userId = user?.id || "";
  const imageUrl = user?.imageUrl || "/dawg.png";
  const [bio, setBio] = useState(String(user?.publicMetadata?.bio) || "");
  const generationCount = user?.publicMetadata?.generationCount || 0;
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await updateProfileDescription(userId, bio);
      const data = await result.json();
      if (data.success) {
        console.log("Profile updated successfully");
        setOpen(false);
        return;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
          <p className="text-muted-foreground mb-4">{bio || "No bio yet"}</p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="text-center">
              <p className="font-bold text-foreground">
                {generationCount !== undefined && generationCount !== null
                  ? generationCount.toString()
                  : "0"}
              </p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userImages.map((image) => (
          <ImageCard key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
}
