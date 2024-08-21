import { DialogContent, DialogContentText } from "@mui/material";

interface ModalContentProps {
  children: React.ReactNode;
}

export function ModalContent({ children }: ModalContentProps) {
  return (
    <DialogContent
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <DialogContentText
        sx={{
          py: 4,
        }}
      >
        {children}
      </DialogContentText>
    </DialogContent>
  );
}
