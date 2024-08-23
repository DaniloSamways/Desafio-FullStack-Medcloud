"use client";

import { FilledButton } from "@/components/Buttons/FilledButton";
import { CreatePatientBox } from "@/components/Home/CreatePatientBox";
import { PatientsGrid } from "@/components/Home/PatientsGrid";
import { SearchInput } from "@/components/Input/SearchPatient";
import { PageTitle } from "@/components/PageTitle";
import {
  findPatientSchema,
  FindPatientSchema,
  Patient,
} from "@/models/Patient";
import { setPatients } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FindPatientSchema>({
    resolver: zodResolver(findPatientSchema),
  });
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [loadingGrid, setLoadingGrid] = useState(true);
  const dispatch = useDispatch();
  const patients = useSelector((state: { patients: Patient[] }) => {
    return state.patients;
  });

  const fetchPatients = useCallback(
    async (page: number = 0, pageSize: number = 7) => {
      console.log("fetchPatients");
      try {
        const res = await fetch(
          `${apiUrl}/patients?page=${page + 1}&limit=${pageSize}`
        );
        const response = await res.json();
        setPaginationModel({ page, pageSize });
        dispatch(setPatients(response.data));
        setRowCount(response.total);
      } catch (error) {
        dispatch(setPatients([]));
        console.error(error);
      } finally {
        setLoadingGrid(false);
      }
    },
    [dispatch, apiUrl]
  );

  useEffect(() => {
    fetchPatients();
  }, [dispatch, fetchPatients]);

  const onSubmit: SubmitHandler<FindPatientSchema> = async ({
    search,
  }: FindPatientSchema) => {
    try {
      if (search === "") {
        fetchPatients();
        return;
      }

      if (search.length < 3) {
        enqueueSnackbar("Digite no mínimo 3 caracteres", {
          variant: "error",
        });
        return;
      }

      const response = await fetch(
        `${apiUrl}/patients/search?filter=${search}&limit=${paginationModel.pageSize}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());
      setRowCount(response.length);
      setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
      dispatch(setPatients(response));
    } catch (err) {
      enqueueSnackbar("Erro ao buscar pacientes", {
        variant: "error",
      });
      console.error(err);
    }
  };

  const handleSearch = async () => {
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      enqueueSnackbar(errors.search?.message || "Erro na busca", {
        variant: "error",
      });
    }
  };

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
              <FilledButton type="button" onClick={handleSearch}>
                Buscar
              </FilledButton>
            </Box>
          </Box>
        </form>
        <PatientsGrid
          fetchPatients={fetchPatients}
          patients={patients}
          loadingGridState={{
            val: loadingGrid,
            set: setLoadingGrid,
          }}
          paginationModelState={{
            val: paginationModel,
            set: setPaginationModel,
          }}
          rowCountState={{
            val: rowCount,
            set: setRowCount,
          }}
        />
      </Box>
    </Box>
  );
}
