"use client";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
} from "@mui/material";

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
    ></Dialog>
  );
}
