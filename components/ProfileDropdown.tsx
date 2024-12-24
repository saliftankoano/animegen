import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const { user } = useUser();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarImage src={user?.imageUrl || "/dawg.png"} />
          <AvatarFallback>{user?.username?.charAt(0) || "G"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-2"
            >
              <User />
              <span>Profile</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <SignOutButton>
            <div className="w-full flex items-center gap-2">
              <LogOut />
              <span>Log out</span>
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
