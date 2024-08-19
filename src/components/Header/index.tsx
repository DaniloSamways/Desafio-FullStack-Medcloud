import { Box, Typography } from "@mui/material";
import { Calendar } from "./Calendar";
import Link from "next/link";

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
        borderColor: "divider",
      }}
    >
      <Link href="/">
        <Typography variant="h4">Logo</Typography>
      </Link>
      <Calendar />
    </Box>
  );
}
