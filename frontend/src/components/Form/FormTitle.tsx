import { Typography } from "@mui/material";

export function FormTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        py: 3,
        px: 3,
        fontWeight: "bold",
        color: "grey.600",
      }}
    >
      {children}
    </Typography>
  );
}
