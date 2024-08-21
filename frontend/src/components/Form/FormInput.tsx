import { Box, Grid, Typography } from "@mui/material";
import { InputField } from "../Input/InputField";
import { InputErrorMessage } from "../Input/InputErrorMessage";

interface FormInputProps {
  label: string;
  value?: string;
  errorMessage?: string;
  register: any;
}

export function FormInput({
  label,
  value,
  errorMessage,
  register,
}: FormInputProps) {
  return (
    <Grid item lg={3} sm={6} xs={12}>
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
    </Grid>
  );
}
