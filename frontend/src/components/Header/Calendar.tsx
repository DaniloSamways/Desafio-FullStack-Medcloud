import { Box } from "@mui/material";

export function Calendar() {
  const actualDay = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        position: "absolute",
        transform: "translateX(-50%)",
        left: "50%",
        border: "1px solid",
        borderRadius: "var(--border-radius)",
        borderColor: "divider",
        color: "grey.500",
        px: 2,
        py: 0.6,
        fontSize: "0.9rem",
      }}
    >
      {actualDay}
    </Box>
  );
}
