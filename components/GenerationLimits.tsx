import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GenerationLimitsProps {
  plan: "Free" | "Pro" | "Premium";
  usedGenerations: number;
}

const planLimits = {
  Free: 10,
  Pro: 200,
  Premium: 1000,
};

export function GenerationLimits({
  plan,
  usedGenerations,
}: GenerationLimitsProps) {
  const limit = planLimits[plan];
  const remainingGenerations = Math.max(limit - usedGenerations, 0);
  const percentage = Math.min((usedGenerations / limit) * 100, 100);
  console.log(plan, usedGenerations, limit);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generation Limits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{plan} Plan</span>
            <span
              aria-label={`${usedGenerations} out of ${limit} generations used`}
            >
              <strong>{usedGenerations}</strong> / {limit} generations
            </span>
          </div>
          <Progress value={percentage} className="w-full" />
          <div className="text-sm font-medium">
            Remaining generations: <strong>{remainingGenerations}</strong>
          </div>
          {remainingGenerations <= 2 && (
            <p className="text-yellow-500 text-sm">
              You&apos;re almost out of generations! Consider upgrading your
              plan.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
