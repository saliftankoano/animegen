import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console

  if (evt.type === "user.created") {
    const { id, email_addresses, username, image_url, public_metadata } =
      evt.data;
    if (!id || !email_addresses) {
      return new Response("Missing data ", {
        status: 400,
      });
    }
    const email_address = email_addresses[0].email_address;
    const bio = public_metadata.bio;

    try {
      const { data, error } = await supabase.from("user").insert([
        {
          user_id: id,
          username: username,
          email_address: email_address,
          image_url: image_url,
          bio: bio,
        },
      ]);
      console.log(data);
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  }

  return new Response("Webhook received", { status: 200 });
}