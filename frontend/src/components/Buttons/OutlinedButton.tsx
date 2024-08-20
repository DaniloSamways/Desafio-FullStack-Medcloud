import { Button, ButtonProps } from "@mui/material";

export function OutlinedButton({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <Button
      {...props}
      sx={{
        px: 4,
        py: 0.5,
        color: "primary.main",
        fontWeight: "500",
        ...props.sx,
      }}
      variant="outlined"
    >
      {children}
    </Button>
  );
}
