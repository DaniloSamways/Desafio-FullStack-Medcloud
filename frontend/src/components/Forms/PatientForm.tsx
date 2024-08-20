import { Box, Divider, Grid, Typography } from "@mui/material";
import { FormInput } from "../Inputs/FormInput";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { FormEventHandler } from "react";

function Input({
  mask,
  label,
  value,
  name,
  control,
  errorMessage,
}: {
  mask?: string;
  label: string;
  value?: string;
  name: string;
  control: Control<FieldValues>;
  errorMessage?: string;
}) {
  return (
    <Grid item lg={3} sm={6} xs={12}>
      <FormInput
        errorMessage={errorMessage}
        mask={mask}
        control={control}
        label={label}
        value={value}
        name={name}
      />
    </Grid>
  );
}

interface PatientFormProps<T extends FieldValues> {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<T>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  control: Control<FieldValues>;
}

export default function PatientForm<T extends FieldValues>({
  register,
  errors,
  onSubmit,
  control,
}: PatientFormProps<T>) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.20)",
      }}
    >
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            py: 3,
            px: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "grey.600",
            }}
          >
            Dados pessoais
          </Typography>
        </Box>
        <Divider />
        <Grid
          container
          spacing={4}
          sx={{
            py: 3,
            px: 3,
          }}
        >
          <Input
            {...register("name", { required: `Nome completo é obrigatório` })}
            control={control}
            name="name"
            errorMessage={errors.name?.message as string}
            label="Nome completo"
          />
          <Input
            {...register("email", { required: `Email é obrigatório` })}
            name="email"
            control={control}
            label="Email"
            errorMessage={errors.email?.message as string}
          />
          <Input
            label="Data de nascimento"
            control={control}
            {...register("birthDate", {
              required: `Data de nascimento é obrigatório`,
            })}
            errorMessage={errors.birthDate?.message as string}
            name="birthDate"
          />
          <Input
            label="CPF"
            {...register("cpf", { required: `CPF é obrigatório` })}
            errorMessage={errors.cpf?.message as string}
            control={control}
            name="cpf"
          />
        </Grid>
        <Divider />
        <Grid
          container
          spacing={4}
          sx={{
            py: 3,
            px: 3,
          }}
        >
          <Input
            {...register("cep", { required: `CEP é obrigatório` })}
            errorMessage={errors.cep?.message as string}
            control={control}
            mask="00000-000"
            name="cep"
            label="CEP"
          />
          <Input
            {...register("address", { required: `Endereço é obrigatório` })}
            errorMessage={errors.address?.message as string}
            control={control}
            name="address"
            label="Endereço"
          />
          <Input
            {...register("number", { required: `Número é obrigatório` })}
            errorMessage={errors.number?.message as string}
            control={control}
            name="number"
            label="Número"
          />
          <Input
            {...register("complement", {
              required: `Complemento é obrigatório`,
            })}
            errorMessage={errors.complement?.message as string}
            control={control}
            name="complement"
            label="Complemento"
          />
          <Input
            {...register("district", { required: `Bairro é obrigatório` })}
            errorMessage={errors.district?.message as string}
            control={control}
            name="district"
            label="Bairro"
          />
          <Input
            {...register("city", { required: `Cidade é obrigatório` })}
            errorMessage={errors.city?.message as string}
            control={control}
            name="city"
            label="Cidade"
          />
          <Input
            {...register("state", { required: `UF é obrigatório` })}
            errorMessage={errors.state?.message as string}
            control={control}
            name="state"
            label="UF"
          />
          <Input
            {...register("country", { required: `País é obrigatório` })}
            errorMessage={errors.country?.message as string}
            control={control}
            name="country"
            label="País"
          />
        </Grid>
      </form>
    </Box>
  );
}
