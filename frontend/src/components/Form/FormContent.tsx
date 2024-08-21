import { Box } from "@mui/material";

export function FormContent({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        py: 3,
        px: 3,
      }}
    >
      {children}
    </Box>
  );
}
