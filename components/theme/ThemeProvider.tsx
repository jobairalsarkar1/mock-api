"use client";

import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // const systemPrefersDark = window.matchMedia(
    //   "(prefers-color-scheme: dark)"
    // ).matches;
    // const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    const initialTheme = savedTheme || "dark";

    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
