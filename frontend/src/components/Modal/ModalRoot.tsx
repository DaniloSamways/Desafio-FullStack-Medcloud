import { Dialog, DialogProps } from "@mui/material";

interface ModalRootProps extends DialogProps {
  children: React.ReactNode;
}

export function ModalRoot({ children, ...rest }: ModalRootProps) {
  return (
    <Dialog
      {...rest}
      maxWidth={"xs"}
      fullWidth={true}
    >
      {children}
    </Dialog>
  );
}