import { Controller, useFormContext } from "react-hook-form";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { forwardRef } from "react";
import dayjs from "@/dayjsConfig";

interface DateFieldProps extends DatePickerProps<any> {}

export function DateField({ ...rest }: DateFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={rest.name!}
      control={control}
      render={({ field }) => (
        <DatePicker
          {...field}
          onChange={(date) => field.onChange(date)}
          value={field.value ? dayjs.tz(field.value, "America/Sao_Paulo") : null}
          label=""
          format="DD/MM/YYYY"
          slots={{
            textField: forwardRef((props, ref) => (
              <TextField {...props} />
            )),
          }}
          sx={{
            fontSize: "inherit",
            color: "inherit",
            "& .MuiInputBase-root": {
              margin: 0,
              border: "none",
              fontSize: "inherit",
              color: "inherit",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              display: "none",
            },
            "& .MuiInputBase-input": {
              padding: 0,
              mb: 0.6,
              fontSize: "inherit",
            },
            ...rest.sx,
          }}
        />
      )}
    />
  );
}
