import { Typography } from "@mui/material";

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: "1.4rem",
        color: "grey.600",
        fontWeight: "600",
      }}
    >
      {children}
    </Typography>
  );
}
