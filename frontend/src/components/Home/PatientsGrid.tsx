"use client";

import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface PatientsGridProps {
  rows: any;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Nome", width: 250 },
  { field: "email", headerName: "E-mail", width: 250 },
  {
    field: "birth_date",
    headerName: "Data de nascimento",
    flex: 1,
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
    renderCell: () => (
      <Box>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];

export function PatientsGrid({ rows }: PatientsGridProps) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableMultipleRowSelection
      disableRowSelectionOnClick
      disableColumnResize
    />
  );
}
