import { Box, Grid, Typography } from "@mui/material";
import { InputField } from "../Input/InputField";
import { InputErrorMessage } from "../Input/InputErrorMessage";
import { MaskedField } from "../Input/MaskedField";

interface FormMaskedInputProps {
  label: string;
  value?: string;
  errorMessage?: string;
  prepare?: (value: string) => string;
  register: any;
  mask: string;
}

export function FormMaskedInput({
  mask,
  label,
  value,
  errorMessage,
  register,
  prepare,
}: FormMaskedInputProps) {
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
          <MaskedField
            register={register}
            placeholder="-"
            value={value}
            mask={mask}
            prepare={prepare}
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
