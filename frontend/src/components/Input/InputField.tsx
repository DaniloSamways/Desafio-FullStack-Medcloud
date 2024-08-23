import { InputBase, InputBaseProps } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputBaseProps {
  register: UseFormRegisterReturn<any>;
}

export function InputField({ register, ...rest }: InputFieldProps) {
  return (
    <>
      <InputBase
        {...register}
        {...rest}
        sx={{
          mt: -0.5,
          fontSize: 14,
          color: "grey.800",
          "& input::placeholder": {
            color: "grey.800",
            fontWeight: "bold",
          },
          ...rest.sx,
        }}
      />
    </>
  );
}
