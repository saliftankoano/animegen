import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center bg-gradient-to-b from-background to-secondary">
        <div className="text-center space-y-6 p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Welcome to MemeMachine
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Create, share, and enjoy the dankest memes on the internet
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="#signup">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Why Choose MemeMachine?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Easy Meme Creation"
              description="Create hilarious memes in seconds with our intuitive meme generator."
            />
            <FeatureCard
              title="Massive Meme Library"
              description="Access thousands of meme templates and trending formats."
            />
            <FeatureCard
              title="Vibrant Community"
              description="Share your memes and interact with fellow meme enthusiasts."
            />
          </div>
        </div>
      </section>

      {/* Sign Up / Sign In Section */}
      <section id="signup" className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Get started with your MemeMachine journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="text" placeholder="Username" />
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Sign Up</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>
                    Sign in to your MemeMachine account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Password" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Sign In</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
