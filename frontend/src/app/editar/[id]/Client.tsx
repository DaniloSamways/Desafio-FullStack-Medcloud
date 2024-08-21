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
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreatePatientSchema>();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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
        <PageTitle>Cadastrar paciente</PageTitle>
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
          Cadastrar
        </FilledButton>
      </Footer>
    </>
  );
}
