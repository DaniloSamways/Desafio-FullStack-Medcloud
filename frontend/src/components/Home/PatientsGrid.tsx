"use client";

import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { Modal } from "../Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Patient } from "@/models/Patient";
import { deletePatient, setPatients } from "@/store";

export function PatientsGrid() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [openModal, setOpenModal] = useState(false);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  const dispatch = useDispatch();
  const patients = useSelector((state: Patient[]) => {
    return state;
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", width: 250 },
    { field: "email", headerName: "E-mail", width: 250 },
    {
      field: "birth_date",
      headerName: "Data de nascimento",
      flex: 1,
      minWidth: 200,
      valueGetter: (value) =>
        new Date(value).toLocaleDateString("pt-BR", {
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
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => (setOpenModal(true), setSelectedPatientId(val.row.id))}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const fetchPatients = async () => {
    try {
      const res = await fetch(`${apiUrl}/patients`);
      const response = await res.json();
      dispatch(setPatients(response));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGrid(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${apiUrl}/patients/${selectedPatientId}`, {
        method: "DELETE",
      });
      dispatch(deletePatient(selectedPatientId));
      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [dispatch]);

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <DataGrid
        loading={loadingGrid}
        slots={{
          noRowsOverlay: () => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 2,
              }}
            >
              <span>Nenhum paciente encontrado</span>
            </Box>
          ),
        }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        sx={{
          ".MuiDataGrid-cell, .MuiDataGrid-columnHeader": {
            px: 3,
          },
          borderRadius: 4,
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.20)",
          backgroundColor: "white",
        }}
        rows={patients}
        columns={columns}
        disableMultipleRowSelection
        rowHeight={80}
        columnHeaderHeight={80}
        disableRowSelectionOnClick
        autoPageSize
      />
      <Modal
        open={openModal}
        modalTrigger={setOpenModal}
        title="Excluir paciente"
        content="Você não terá mais acesso ao paciente, você quer mesmo excluí-lo?"
        confirmButtonText="Sim, excluir"
        confirmButtonAction={() => handleDelete()}
      />
    </Box>
  );
}
