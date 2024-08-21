import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {  UseFormRegisterReturn } from "react-hook-form";

interface SearchInputProps {
  register: UseFormRegisterReturn<any>;
}

export function SearchInput({ register }: SearchInputProps) {
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
      <InputBase {...register} sx={{ flex: 1 }} />
    </Box>
  );
}
