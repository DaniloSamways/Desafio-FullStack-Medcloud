import { Box } from "@mui/material";
import { FormEventHandler } from "react";

interface FormRootProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

export function FormRoot({ onSubmit, children }: FormRootProps) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.20)",
      }}
    >
      <form onSubmit={onSubmit}>{children}</form>
    </Box>
  );
}
