import { FilledButton } from "@/components/Buttons/FilledButton";
import { CreatePatientBox } from "@/components/Home/CreatePatientBox";
import { SearchInput } from "@/components/Inputs/SearchPatient";
import { PageTitle } from "@/components/PageTitle";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <CreatePatientBox />
      <Box
        component={"main"}
        sx={{
          mx: "var(--padding-x)",
          my: "var(--padding-y)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <PageTitle>Pacientes</PageTitle>
          <SearchInput />
          <FilledButton>Pesquisar</FilledButton>
        </Box>
      </Box>
    </Box>
  );
}
