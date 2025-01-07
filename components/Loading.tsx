import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { TextShimmer } from "@/components/ui/text-shimmer";
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
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <TextShimmer
        duration={1}
        className="text-xl font-medium 
                   [--base-color:theme(colors.gray.100)] 
                   [--base-gradient-color:theme(colors.blue.400)]
                   dark:[--base-color:theme(colors.gray.300)] 
                   dark:[--base-gradient-color:theme(colors.blue.700)]"
      >
        Working our magic... ✨
      </TextShimmer>
      <Progress
        value={progress}
        className="w-[60%] 
                   bg-muted dark:bg-white 
                   [&>div]:bg-primary dark:[&>div]:bg-blue-700"
      />
    </div>
  );
}
