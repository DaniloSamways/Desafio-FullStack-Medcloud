import { Box, Icon, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchInput() {
  return (
    <Box
      sx={{
        width: "50%",
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: "var(--border-radius)",
        display: "flex",
        alignItems: "center",
        px: 2,
        gap: 2,
        backgroundColor: "white",
      }}
    >
      <SearchIcon
        sx={{
          color: "grey.500",
        }}
      />
      <InputBase sx={{ flex: 1 }} />
    </Box>
  );
}
