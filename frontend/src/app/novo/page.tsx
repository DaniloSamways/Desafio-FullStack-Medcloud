"use client";

import { FilledButton } from "@/components/Buttons/FilledButton";
import { Footer } from "@/components/Footer";
import PatientForm from "@/components/Forms/PatientForm";
import { PageTitle } from "@/components/PageTitle";
import { addPatient } from "@/store";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function NewPatient() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    control,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(addPatient(data));
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
          control={control}
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
