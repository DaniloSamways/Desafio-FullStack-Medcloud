"use client";

import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Patient } from "@/models/Patient";
import { deletePatient, setPatients } from "@/store";
import { Modal } from "../Modal";
import { OutlinedButton } from "../Buttons/OutlinedButton";
import { FilledButton } from "../Buttons/FilledButton";
import { useRouter } from "next/navigation";
import { Grid } from "@/components/Grid";
import dayjs from "@/dayjsConfig";

export function PatientsGrid() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  const dispatch = useDispatch();
  const patients = useSelector((state: { patients: Patient[] }) => {
    return state.patients;
  });
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", width: 250 },
    { field: "email", headerName: "E-mail", width: 250 },
    {
      field: "birth_date",
      headerName: "Data de nascimento",
      flex: 1,
      minWidth: 200,
      valueGetter: (value) =>
        new Date(
          dayjs.tz(value, "America/Sao_Paulo").toString()
        ).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
    },
    {
      field: "actions",
      headerName: "",
      width: 150,
      renderCell: (val) => (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => router.push(`/editar/${val.row.id}?t=${Date.now()}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => (
              setOpenModal(true), setSelectedPatientId(val.row.id)
            )}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const fetchPatients = useCallback(
    async (page: number = 1, pageSize: number = 10) => {
      try {
        const res = await fetch(
          `${apiUrl}/patients?page=${page}&limit=${pageSize}`
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

  const handleDelete = async () => {
    try {
      await fetch(`${apiUrl}/patients/${selectedPatientId}`, {
        method: "DELETE",
      });
      dispatch(deletePatient(selectedPatientId));
      fetchPatients();
    } catch (error) {
      console.error(error);
    } finally {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [dispatch, fetchPatients]);

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Grid.Root
        paginationMode="server"
        pageSizeOptions={[10]}
        columns={columns}
        rowCount={rowCount}
        rows={patients}
        loading={loadingGrid}
        paginationModel={paginationModel}
        onPaginationModelChange={(params) => {
          fetchPatients(params.page, params.pageSize);
        }}
      />

      <Modal.Root open={openModal}>
        <Modal.Title closeTrigger={() => setOpenModal(false)}>
          Excluir paciente
        </Modal.Title>
        <Modal.Content>
          Você não terá mais acesso ao paciente, você quer mesmo excluí-lo?
        </Modal.Content>
        <Modal.Action>
          <OutlinedButton
            onClick={() => setOpenModal(false)}
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
          <FilledButton color="error" sx={{ px: 1.5 }} onClick={handleDelete}>
            Sim, excluir
          </FilledButton>
        </Modal.Action>
      </Modal.Root>
    </Box>
  );
}
