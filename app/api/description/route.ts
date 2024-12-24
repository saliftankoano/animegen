import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const { bio, userId } = await request.json();

  const client = await clerkClient();
  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        bio: bio,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ success: false });
  }
}
