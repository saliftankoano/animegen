import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const { bio, userId } = await request.json();
  console.log(bio, userId + " In the API route");

  const client = await clerkClient();
  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        bio: bio,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
