import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

export function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 2.77777778;
      });
    }, 1400); // Every 1.4 seconds increment the progress by 2.77777778%

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <Progress
        value={progress}
        className="w-[60%] bg-black [&>div]:bg-white"
      />
      <p className="text-sm text-muted-foreground">Working our magic... ✨</p>
    </div>
  );
}
