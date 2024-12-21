"use server";

export async function generateImage(prompt: string) {
  try {
    const response = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Image generation failed",
    };
  }
}
