"use server";

export async function UpdateProfileDescription(userId: string, bio: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/description`, {
      method: "POST",
      body: JSON.stringify({ bio: bio, userId }),
    });
    const data = await response.json();
    console.log(data);
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false };
  }
}
