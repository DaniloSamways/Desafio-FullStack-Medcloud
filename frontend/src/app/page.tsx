import { FilledButton } from "@/components/Buttons/FilledButton";
import { CreatePatientBox } from "@/components/Home/CreatePatientBox";
import { PatientsGrid } from "@/components/Home/PatientsGrid";
import { SearchInput } from "@/components/Inputs/SearchPatient";
import { PageTitle } from "@/components/PageTitle";
import { Box } from "@mui/material";
import { GridRowsProp } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  {
    id: 1,
    name: "Danilo Samways",
    email: "danilo@gmail.com",
    birth_date: "2005-12-27",
  },
];

export default function Home() {
  return (
    <Box>
      <CreatePatientBox />
      <Box
        component={"main"}
        sx={{
          mx: "var(--padding-x)",
          my: "var(--padding-y)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <PageTitle>Pacientes</PageTitle>
          <SearchInput />
          <FilledButton>Pesquisar</FilledButton>
        </Box>
        <PatientsGrid rows={rows} />
      </Box>
    </Box>
  );
}
