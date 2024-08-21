import { Box } from "@mui/material";

export function GridNoRows({ message }: { message: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 2,
      }}
    >
      <span>{ message }</span>
    </Box>
  );
}
