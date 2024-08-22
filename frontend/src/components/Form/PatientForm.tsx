import { Divider, Grid } from "@mui/material";
import {
  FieldErrors,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";
import { FormEventHandler } from "react";
import { Form } from ".";
import { CreatePatientSchema } from "@/models/Patient";

interface PatientFormProps {
  methods: UseFormReturn<CreatePatientSchema, any, undefined>;
  errors: FieldErrors<CreatePatientSchema>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function PatientForm({
  methods,
  errors,
  onSubmit,
}: PatientFormProps) {
  const { register } = methods;

  return (
    <Form.Root onSubmit={onSubmit}>
      <FormProvider {...methods}>
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
            <Form.InputDate
              label="Data de nascimento"
              name={"birth_date"}
              errorMessage={errors.birth_date?.message as string}
            />
            <Form.InputMasked
              mask="000.000.000-00"
              label="CPF"
              register={register("cpf")}
              errorMessage={errors.cpf?.message as string}
            />
          </Grid>
        </Form.Content>
        <Divider />
        <Form.Content>
          <Grid container spacing={4}>
            <Form.InputMasked
              mask="00000-000"
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
            <Form.InputMasked
              mask="aa"
              prepare={(str) => str.toUpperCase()}
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
      </FormProvider>
    </Form.Root>
  );
}
