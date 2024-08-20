import { Button, ButtonProps } from "@mui/material";

export function FilledButton({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        px: 4,
        py: 0.5,
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
}
