import { z } from "zod";

export interface Patient {
  id: string;
  cpf: string;
  name: string;
  birth_date: string;
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
  cpf: z.string({ message: "CPF é obrigatório" }).min(11, "CPF inválido"),
  name: z
    .string({ message: "Nome Completo é obrigatório" })
    .min(10, { message: "Nome Completo deve ter no mínimo 10 caracteres" }),
  birth_date: z
    .string({ message: "Data de Nascimento é obrigatório" })
    .length(10, { message: "Data de Nascimento inválida" }),
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
  zip_code: z
    .string({ message: "CEP é obrigatório" })
    .length(8, "CEP inválido"),
  street: z
    .string({ message: "Rua é obrigatório" })
    .min(5, "Rua é obrigatório"),
  number: z
    .string({ message: "Número é obrigatório" })
    .min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  district: z
    .string({ message: "Bairro é obrigatório" })
    .min(3, "Bairro é obrigatório"),
  city: z
    .string({ message: "Cidade é obrigatório" })
    .min(3, "Cidade é obrigatório"),
  state: z
    .string({ message: "Estado é obrigatório" })
    .length(2, "Estado inválido"),
  country: z
    .string({ message: "País é obrigatório" })
    .min(3, "País é obrigatório"),
});

export type CreatePatientSchema = z.infer<typeof createPatientSchema>;
