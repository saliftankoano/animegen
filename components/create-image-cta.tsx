import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { JoinButton } from "./JoinButton";
export function CreateImageCTA() {
  const { user } = useUser();

  return (
    <Card className="relative overflow-hidden mt-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 animate-gradient"></div>
      <CardContent className="relative z-10 flex flex-col items-center justify-center p-6 text-white">
        <h2 className="text-2xl text-black font-bold mb-2">
          Ready to create your own anime images?
        </h2>
        <p className="text-lg mb-4">
          Join the fun and let your imagination run wild!
        </p>
        {user ? (
          <Link href="/create">
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold bg-white text-purple-700 hover:bg-purple-100"
            >
              Let&apos;s Go!
            </Button>
          </Link>
        ) : (
          <JoinButton color="white" />
        )}
      </CardContent>
    </Card>
  );
}
