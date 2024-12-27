"use client";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export default function ThemeAwareToaster() {
  const { theme } = useTheme();
  return (
    <>
      <Toaster theme={(theme as "light") || "dark" || "system"} richColors />
    </>
  );
}
