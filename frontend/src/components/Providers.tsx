"use client";

import { patientsStore } from "@/store";
import { theme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={patientsStore}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </Provider>
  );
}
