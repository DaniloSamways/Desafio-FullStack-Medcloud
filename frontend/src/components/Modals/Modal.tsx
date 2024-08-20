"use client";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OutlinedButton } from "../Buttons/OutlinedButton";
import { FilledButton } from "../Buttons/FilledButton";
import { useState } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  content: string;
  confirmButtonText: string;
  confirmButtonAction: () => void;
  modalTrigger: () => void;
}

export function Modal(props: ModalProps & (DialogProps | any)) {
  function handleConfirmButton() {
    props.confirmButtonAction();
    props.modalTrigger();
  }

  return (
    <Dialog
      {...props}
      maxWidth={"xs"}
      fullWidth={true}
      onClose={() => props.modalTrigger(false)}
    >
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
          {props.title}
        </Typography>
        <IconButton onClick={() => props.modalTrigger(!props.open)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 2,
          gap: 2,
        }}
      >
        <OutlinedButton
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
        </FilledButton>
      </DialogActions>
    </Dialog>
  );
}
