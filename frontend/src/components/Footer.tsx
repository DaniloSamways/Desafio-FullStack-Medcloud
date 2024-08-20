import { Box, BoxProps } from "@mui/material";
import { PropsWithChildren } from "react";

export function Footer({
  children,
  ...props
}: React.PropsWithChildren<BoxProps>) {
  return (
    <Box
      {...props}
      component="footer"
      sx={{
        backgroundColor: "white",
        px: "var(--padding-x)",
        py: "var(--padding-y)",
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
}
