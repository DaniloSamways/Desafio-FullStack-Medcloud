import { Typography } from "@mui/material";
import React from "react";

interface InputErrorMessageProps {
  children: React.ReactNode;
}

export function InputErrorMessage({ children }: InputErrorMessageProps) {
  return (
    <Typography
      variant="caption"
      sx={{
        color: "error.main",
        mt: 1,
      }}
    >
      {children}
    </Typography>
  );
}
