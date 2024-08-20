import { Box, InputBase, Typography } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

interface FormInputProps {
  mask?: string;
  label: string;
  value?: string;
  name: string;
  control: Control<FieldValues>;
  errorMessage?: string;
}

export function FormInput({
  mask,
  label,
  value,
  name,
  control,
  errorMessage,
}: FormInputProps) {
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
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <InputBase
              {...field}
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
          )}
        />
      </Box>
      {errorMessage && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: -25,
            color: "error.main",
            mt: 1,
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}
