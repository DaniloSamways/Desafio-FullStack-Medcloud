import { Box, Typography } from "@mui/material";
import { Calendar } from "./Calendar";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";

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
        py: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Link href="/">
        <Image src={Logo} alt="Logo" width={200} />
      </Link>
      <Calendar />
    </Box>
  );
}
