"use client";

import { FilledButton } from "@/components/Buttons/FilledButton";
import { Footer } from "@/components/Footer";
import PatientForm from "@/components/Form/PatientForm";
import { PageTitle } from "@/components/PageTitle";
import { CreatePatientSchema, Patient } from "@/models/Patient";
import { updatePatient } from "@/store";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export function Client({ patient }: { patient: Patient }) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreatePatientSchema>({
    defaultValues: {
      name: patient.name,
      email: patient.email,
      cpf: patient.cpf,
      birth_date: patient.birth_date,
      city: patient.address.city,
      district: patient.address.district,
      number: patient.address.number,
      street: patient.address.street,
      zip_code: patient.address.zip_code,
      state: patient.address.state,
      country: patient.address.country,
    },
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payload = {
      ...data,
      address: {
        city: data.city,
        district: data.district,
        number: data.number,
        street: data.street,
        zip_code: data.zip_code,
        state: data.state,
        country: data.country,
      },
    };

    const response = await fetch(
      `http://localhost:3000/patients/${patient.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    ).then((res) => res.json());
    dispatch(updatePatient(data));
    router.push("/");
  };

  const handleSave = async () => {
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          py: 2,
          px: "var(--padding-x)",
          height: "100vh",
          backgroundColor: "var(--secondary-background-color)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <PageTitle>Editar paciente</PageTitle>
        <PatientForm
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Box>
      <Footer
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <FilledButton
          onClick={() => router.push("/")}
          sx={{
            backgroundColor: "grey.600",
            "&:hover": {
              backgroundColor: "grey.700",
            },
          }}
        >
          Cancelar
        </FilledButton>
        <FilledButton color="secondary" onClick={handleSave}>
          Salvar
        </FilledButton>
      </Footer>
    </>
  );
}
