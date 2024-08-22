"use client";

import { FilledButton } from "@/components/Buttons/FilledButton";
import { Footer } from "@/components/Footer";
import PatientForm from "@/components/Form/PatientForm";
import { PageTitle } from "@/components/PageTitle";
import { CreatePatientSchema, createPatientSchema } from "@/models/Patient";
import { addPatient } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function NewPatient() {
  const formMethods = useForm<CreatePatientSchema>({
    resolver: zodResolver(createPatientSchema),
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = formMethods;
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<CreatePatientSchema> = async (
    data: CreatePatientSchema
  ) => {
    try {
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
          complement: data.complement,
        },
      };

      const response = await fetch(`http://${apiUrl}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then(async (res) => {
        if (!res.ok) {
          throw await res.json();
        }
        return res.json();
      });

      dispatch(addPatient(response));
      router.push("/");
    } catch (err) {
      alert(JSON.stringify(err));
    }
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
          overflowY: "auto",
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
          methods={formMethods}
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
