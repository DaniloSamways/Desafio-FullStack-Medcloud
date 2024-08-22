import { InputBase, InputBaseProps } from "@mui/material";
import React, { forwardRef, Ref } from "react";
import { UseFormRegister } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface MaskedFieldProps extends InputBaseProps {
  prepare?: (value: string) => string;
  register: UseFormRegister<any>;
  mask: string;
}

export function MaskedField({ mask, register, ...rest }: MaskedFieldProps) {
  const CustomMaskedInput = forwardRef<HTMLInputElement | undefined, any>(
    function CustomMaskedInput(props, ref) {
      return (
        <IMaskInput
          {...rest}
          {...props}
          mask={mask}
          inputRef={ref}
          onAccept={(value: any) =>
            props.onChange({ target: { name: props.name!, value } })
          }
          overwrite
        />
      );
    }
  );

  return (
    <>
      <InputBase
        {...register}
        inputComponent={CustomMaskedInput}
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
