"use client";

import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Patient } from "@/models/Patient";
import { deletePatient } from "@/store";
import { Modal } from "../Modal";
import { OutlinedButton } from "../Buttons/OutlinedButton";
import { FilledButton } from "../Buttons/FilledButton";
import { useRouter } from "next/navigation";
import { Grid } from "@/components/Grid";
import dayjs from "@/dayjsConfig";

interface PatientsGridProps {
  patients: Patient[];
  rowCountState: {
    val: number;
    set: (rowCount: number) => void;
  };
  paginationModelState: {
    val: { page: number; pageSize: number };
    set: (paginationModel: {
      page: number;
      pageSize: number;
    }) => void;
  };
  loadingGridState: {
    val: boolean;
    set: (loadingGrid: boolean) => void;
  };
  fetchPatients: (page?: number, pageSize?: number) => void;
}

export function PatientsGrid({
  patients,
  rowCountState,
  paginationModelState,
  loadingGridState,
  fetchPatients
}: PatientsGridProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [openModal, setOpenModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  const dispatch = useDispatch();
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

  const handleDelete = async () => {
    try {
      await fetch(`${apiUrl}/patients/${selectedPatientId}`, {
        method: "DELETE",
      });
      dispatch(deletePatient(selectedPatientId));
      fetchPatients(
        paginationModelState.val.page,
        paginationModelState.val.pageSize
      );
    } catch (error) {
      console.error(error);
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Grid.Root
        paginationMode="server"
        pageSizeOptions={[paginationModelState.val.pageSize]}
        columns={columns}
        rowCount={rowCountState.val}
        rows={patients}
        loading={loadingGridState.val}
        paginationModel={paginationModelState.val}
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
