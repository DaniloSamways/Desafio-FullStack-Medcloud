import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FilledButton } from "../Buttons/FilledButton";
import { OutlinedButton } from "../Buttons/OutlinedButton";

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
      <FilledButton startIcon={<AddIcon />} color="secondary">Novo</FilledButton>
    </Box>
  );
}
