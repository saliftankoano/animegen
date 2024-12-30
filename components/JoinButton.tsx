import { SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export function JoinButton() {
  return (
    <>
      <Button
        asChild
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-white hover:text-black"
      >
        <SignUpButton
          signInForceRedirectUrl={"/feed"}
          forceRedirectUrl={"/feed"}
        >
          Join the community
        </SignUpButton>
      </Button>
    </>
  );
}
