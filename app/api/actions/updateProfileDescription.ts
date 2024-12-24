"use server";
import { NextResponse } from "next/server";

export async function updateProfileDescription(userId: string, bio: string) {
  try {
    const response = await fetch("/api/description", {
      method: "POST",
      body: JSON.stringify({ bio: bio, userId }),
    });
    const data = await response.json();
    console.log(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ success: false });
  }
}
