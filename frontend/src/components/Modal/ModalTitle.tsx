import { DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalTitleProps {
  children: React.ReactNode;
  closeTrigger: (value: boolean) => void;
}

export function ModalTitle({ children, closeTrigger }: ModalTitleProps) {
  return (
    <DialogTitle
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: 20,
        }}
      >
        {children}
      </Typography>
      <IconButton onClick={() => closeTrigger(false)}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}
