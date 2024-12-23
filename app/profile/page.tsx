"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// This would typically come from an API call
const userProfile = {
  username: "MemeMaster",
  avatar: "/placeholder.svg?height=150&width=150",
  bio: "Creating and sharing the dankest memes since 2023",
  memeCount: 42,
  followerCount: 1337,
  followingCount: 420,
};

const userMemes = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=500&width=500",
    caption: "When the code finally works",
    creator: "MemeMaster",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-06-15",
    likes: 1337,
    comments: 42,
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=500&width=500",
    caption: "Debugging at 3 AM",
    creator: "MemeMaster",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-06-14",
    likes: 2048,
    comments: 128,
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=500&width=500",
    caption: 'When the client says "small change"',
    creator: "MemeMaster",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-06-13",
    likes: 4096,
    comments: 256,
  },
];

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState(userProfile);

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProfile = {
      ...profile,
      username: formData.get("username") as string,
      bio: formData.get("bio") as string,
    };
    setProfile(updatedProfile);
    // Here you would typically send the updated profile to your backend
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Avatar className="mb-4">
            <AvatarImage src={user?.imageUrl || "/dawg.png"} />
            <AvatarFallback>{user?.username?.charAt(0) || "G"}</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold text-primary mb-2">
            {user?.username || "Gino432"}
          </h1>
          <p className="text-muted-foreground mb-4">{profile.bio}</p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="text-center">
              <p className="font-bold text-foreground">{profile.memeCount}</p>
              <p className="text-sm text-muted-foreground">Memes</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">
                {profile.followerCount}
              </p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">
                {profile.followingCount}
              </p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
          <Dialog>
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
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={profile.username}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" defaultValue={profile.bio} />
                </div>
                <Button type="submit" className="w-full">
                  Save changes
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold text-primary text-center">My Memes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userMemes.map((meme) => (
          <ImageCard key={meme.id} {...meme} />
        ))}
      </div>
    </div>
  );
}
