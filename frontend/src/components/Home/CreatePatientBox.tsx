"use client";

import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FilledButton } from "../Buttons/FilledButton";
import { useRouter } from "next/navigation";

export function CreatePatientBox() {
  const router = useRouter();

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
        onClick={() => {
          router.push("/novo");
        }}
        color="secondary"
      >
        Novo
      </FilledButton>
    </Box>
  );
}
