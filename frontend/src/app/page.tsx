"use client";

import { FilledButton } from "@/components/Buttons/FilledButton";
import { CreatePatientBox } from "@/components/Home/CreatePatientBox";
import { PatientsGrid } from "@/components/Home/PatientsGrid";
import { SearchInput } from "@/components/Input/SearchPatient";
import { PageTitle } from "@/components/PageTitle";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {};

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CreatePatientBox />
      <Box
        component={"main"}
        sx={{
          px: "var(--padding-x)",
          py: "var(--padding-y)",
          pb: 10,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: 2,
          backgroundColor: "#f2f2f3",
        }}
      >
        <form>
          <Box sx={{ display: "flex", alignItems: "center", py: 1.6 }}>
            <PageTitle>Pacientes</PageTitle>
            <Box
              sx={{
                display: "flex",
                ml: 6,
                gap: 2,
                flex: 1,
              }}
            >
              <SearchInput register={register("search")} />
              <FilledButton type="submit" onClick={handleSubmit(onSubmit)}>
                Buscar
              </FilledButton>
            </Box>
          </Box>
        </form>
        <PatientsGrid />
      </Box>
    </Box>
  );
}
