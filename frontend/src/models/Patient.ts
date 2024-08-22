import { z } from "zod";

export interface Patient {
  id: string;
  cpf: string;
  name: string;
  birth_date: Date;
  email: string;
  address: {
    zip_code: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    country: string;
  };
}

export const createPatientSchema = z.object({
  cpf: z.preprocess(
    (cpf: unknown) => (cpf as string).replace(/\D/g, ""),
    z.string({ message: "CPF é obrigatório" }).length(11, "CPF inválido")
  ),
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(5, "Nome deve ter no mínimo 5 caracteres")
    .max(255, "Nome deve ter no máximo 255 caracteres")
    .refine((name) => name.trim().includes(" "), {
      message: "Nome completo é obrigatório",
    }),
  birth_date: z.preprocess(
    (birth_date: unknown) => {
      if (!birth_date) return { message: "Data de Nascimento inválida" };
      const date = new Date(birth_date as string);
      if (isNaN(date.getTime())) {
        return { message: "Data de Nascimento inválida" };
      }
      return date;
    },
    z.date({
      invalid_type_error: "Data de Nascimento inválida",
      required_error: "Data de Nascimento é obrigatória",
    })
  ),
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
  zip_code: z.preprocess(
    (zip_code: unknown) => (zip_code as string).replace(/\D/g, ""),
    z.string({ message: "CEP é obrigatório" }).length(8, "CEP inválido")
  ),
  street: z
    .string({ message: "Endereço é obrigatório" })
    .min(3, "Endereço deve ter no mínimo 3 caracteres")
    .max(100, "Endereço deve ter no máximo 100 caracteres"),
  number: z
    .string({ message: "Número é obrigatório" })
    .min(1, "Número deve ter no mínimo 1 caractere")
    .max(10, "Número deve ter no máximo 10 caracteres"),
  complement: z
    .string()
    .max(100, "Complemento deve ter no máximo 100 caracteres")
    .optional(),
  district: z
    .string({ message: "Bairro é obrigatório" })
    .min(3, "Bairro deve ter no mínimo 3 caracteres")
    .max(50, "Bairro deve ter no máximo 50 caracteres"),
  city: z
    .string({ message: "Cidade é obrigatório" })
    .min(2, "Cidade deve ter no mínimo 2 caracteres")
    .max(100, "Cidade deve ter no máximo 100 caracteres"),
  state: z
    .string({ message: "Estado é obrigatório" })
    .length(2, "Estado inválido"),
  country: z
    .string({ message: "País é obrigatório" })
    .min(2, "País inválido")
    .max(56, "País inválido"),
});

export type CreatePatientSchema = z.infer<typeof createPatientSchema>;
