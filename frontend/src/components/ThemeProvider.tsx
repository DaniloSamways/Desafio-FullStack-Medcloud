"use client";

import { theme } from "@/theme";
import { ThemeProvider as Provider } from "@emotion/react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <Provider theme={theme}>{children}</Provider>;
}
