import CreateClientComponent from "@/components/CreateClientComponent";
import { auth } from "@clerk/nextjs/server";

async function CreatePageAuth() {
  const { userId } = await auth();
  if (!userId) {
    return <div>You must be logged in to create an image</div>;
  }
}
export default async function CreateImage() {
  await CreatePageAuth();
  return <CreateClientComponent />;
}
