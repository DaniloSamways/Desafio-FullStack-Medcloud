import { Divider, Grid } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormEventHandler } from "react";
import { Form } from ".";
import { CreatePatientSchema } from "@/models/Patient";

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
          <Form.Input
            register={register("name")}
            errorMessage={errors.name?.message as string}
            label="Nome completo"
          />
          <Form.Input
            register={register("email")}
            label="Email"
            errorMessage={errors.email?.message as string}
          />
          <Form.Input
            label="Data de nascimento"
            register={register("birth_date")}
            errorMessage={errors.birth_date?.message as string}
          />
          <Form.Input
            label="CPF"
            register={register("cpf")}
            errorMessage={errors.cpf?.message as string}
          />
        </Grid>
      </Form.Content>
      <Divider />
      <Form.Content>
        <Grid container spacing={4}>
          <Form.Input
            register={register("zip_code")}
            errorMessage={errors.zip_code?.message as string}
            label="CEP"
          />
          <Form.Input
            register={register("street")}
            errorMessage={errors.street?.message as string}
            label="Endereço"
          />
          <Form.Input
            register={register("number")}
            errorMessage={errors.number?.message as string}
            label="Número"
          />
          <Form.Input
            register={register("complement", {})}
            errorMessage={errors.complement?.message as string}
            label="Complemento"
          />
          <Form.Input
            register={register("district")}
            errorMessage={errors.district?.message as string}
            label="Bairro"
          />
          <Form.Input
            register={register("city")}
            errorMessage={errors.city?.message as string}
            label="Cidade"
          />
          <Form.Input
            register={register("state")}
            errorMessage={errors.state?.message as string}
            label="UF"
          />
          <Form.Input
            register={register("country")}
            errorMessage={errors.country?.message as string}
            label="País"
          />
        </Grid>
      </Form.Content>
    </Form.Root>
  );
}
