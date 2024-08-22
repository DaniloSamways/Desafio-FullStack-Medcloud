import { Box, Grid, Typography } from "@mui/material";
import { InputErrorMessage } from "../Input/InputErrorMessage";
import { DateField } from "../Input/DateField";
import dayjs from "@/dayjsConfig";

interface FormDateInputProps {
  label: string;
  value?: string;
  errorMessage?: string;
  name: string;
}

export function FormDateInput({
  label,
  value,
  errorMessage,
  name,
}: FormDateInputProps) {
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
          <DateField
            name={name}
            maxDate={new Date()}
            defaultValue={value ? dayjs.tz(value, "America/Sao_Paulo") : null}
            sx={{
              fontSize: 14,
              color: "grey.800",
              "& .MuiInputLabel-root": {
                color: "grey.500",
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
