import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { Grid } from "@/components/Grid/";

interface GridRootProps extends DataGridProps {}

export function GridRoot({ loading = true,...rest }: GridRootProps) {
  return (
    <DataGrid
      {...rest}
      loading={loading}
      slots={{
        noRowsOverlay: () => (
          <Grid.NoRows message="Nenhum paciente encontrado" />
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
      disableMultipleRowSelection
      rowHeight={80}
      columnHeaderHeight={80}
      disableRowSelectionOnClick
      autoPageSize
    />
  );
}
