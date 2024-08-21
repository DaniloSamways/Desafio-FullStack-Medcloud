import { Box, Typography } from "@mui/material";
import { InputField } from "../Input/InputField";
import { InputErrorMessage } from "../Input/InputErrorMessage";
import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  value?: string;
  errorMessage?: string;
  register: UseFormRegister<any>;
}

export function FormInput({ register, label, value, errorMessage }: FormInputProps) {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "grey.200",
          outline: errorMessage && "1px solid",
          outlineColor: errorMessage ? "error.main" : "",
          borderRadius: "4px",
          px: 2,
          pt: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "grey.500",
            fontWeight: "bold",
          }}
        >
          {label}
        </Typography>
        <InputField
          register={register}
          placeholder="-"
          value={value}
          sx={{
            mt: -0.5,
            fontSize: 14,
            color: "grey.800",
            "& input::placeholder": {
              color: "grey.800",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </Box>
  );
}
