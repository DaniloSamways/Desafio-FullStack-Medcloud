import { Box, Typography } from "@mui/material";
import { Calendar } from "./Calendar";

export function Header() {
  return (
    <Box
      component={"header"}
      sx={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "space-between",
        px: "var(--padding-x)",
        py: "var(--padding-y)",
        borderBottom: "1px solid",
        borderColor: "grey.300",
      }}
    >
      <Typography variant="h4">Logo</Typography>
      <Calendar />
    </Box>
  );
}
