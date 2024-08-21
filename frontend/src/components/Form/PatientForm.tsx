import { Divider, Grid, TextField, Typography } from "@mui/material";
import { FormInput } from "../Inputs/FormInput";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormEventHandler } from "react";
import { Form } from ".";
import { CreatePatientSchema } from "@/models/Patient";

function Inputt({
  label,
  value,
  errorMessage,
  register,
}: {
  label: string;
  value?: string;
  errorMessage?: string;
  register: any;
}) {
  return (
    <Grid item lg={3} sm={6} xs={12}>
      <FormInput
        register={register}
        errorMessage={errorMessage}
        label={label}
        value={value}
      />
    </Grid>
  );
}

interface PatientFormProps {
  register: UseFormRegister<CreatePatientSchema>;
  errors: FieldErrors<CreatePatientSchema>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function PatientForm({
  register,
  errors,
  onSubmit,
}: PatientFormProps) {
  return (
    <Form.Root onSubmit={onSubmit}>
      <Form.Title>Dados do paciente</Form.Title>
      <Divider />
      <Form.Content>
        <Grid container spacing={4}>
          <Inputt
            register={register("name")}
            errorMessage={errors.name?.message as string}
            label="Nome completo"
          />
          <Inputt
            register={register("email")}
            label="Email"
            errorMessage={errors.email?.message as string}
          />
          <Inputt
            label="Data de nascimento"
            register={register("birth_date")}
            errorMessage={errors.birth_date?.message as string}
          />
          <Inputt
            label="CPF"
            register={register("cpf")}
            errorMessage={errors.cpf?.message as string}
          />
        </Grid>
      </Form.Content>
      <Divider />
      <Form.Content>
        <Grid container spacing={4}>
          <Inputt
            register={register("zip_code")}
            errorMessage={errors.zip_code?.message as string}
            label="CEP"
          />
          <Inputt
            register={register("street")}
            errorMessage={errors.street?.message as string}
            label="Endereço"
          />
          <Inputt
            register={register("number")}
            errorMessage={errors.number?.message as string}
            label="Número"
          />
          <Inputt
            register={register("complement", {})}
            errorMessage={errors.complement?.message as string}
            label="Complemento"
          />
          <Inputt
            register={register("district")}
            errorMessage={errors.district?.message as string}
            label="Bairro"
          />
          <Inputt
            register={register("city")}
            errorMessage={errors.city?.message as string}
            label="Cidade"
          />
          <Inputt
            register={register("state")}
            errorMessage={errors.state?.message as string}
            label="UF"
          />
          <Inputt
            register={register("country")}
            errorMessage={errors.country?.message as string}
            label="País"
          />
        </Grid>
      </Form.Content>
    </Form.Root>
  );
}
