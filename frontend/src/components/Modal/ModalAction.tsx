import { DialogActions } from "@mui/material";
import { OutlinedButton } from "../Buttons/OutlinedButton";
import React from "react";

export function ModalAction({ children }: { children: React.ReactNode }) {
  return (
    <DialogActions
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 2,
        gap: 2,
      }}
    >
      {children}
      {/* <OutlinedButton
        onClick={() => props.modalTrigger(!props.open)}
        sx={{
          px: 1.5,
          color: "black",
          borderColor: "grey.300",

          "&:hover": {
            backgroundColor: "grey.100",
            borderColor: "grey.300",
          },
        }}
      >
        Cancelar
      </OutlinedButton>
      <FilledButton
        color="error"
        sx={{ px: 1.5 }}
        onClick={() => handleConfirmButton()}
      >
        {props.confirmButtonText}
      </FilledButton> */}
    </DialogActions>
  );
}
