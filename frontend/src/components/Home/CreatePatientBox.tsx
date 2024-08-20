"use client";

import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FilledButton } from "../Buttons/FilledButton";
import { useDispatch, useSelector } from "react-redux";
import { Patient } from "@/models/Patient";

export function CreatePatientBox() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        px: "var(--padding-x)",
        py: "var(--padding-y)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <FilledButton
        startIcon={<AddIcon />}
        color="secondary"
      >
        Novo
      </FilledButton>
    </Box>
  );
}
