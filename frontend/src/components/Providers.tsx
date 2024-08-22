"use client";

import { patientsStore } from "@/store";
import { theme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Provider } from "react-redux";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={patientsStore}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}
