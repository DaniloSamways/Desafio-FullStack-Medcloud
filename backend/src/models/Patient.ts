import { z } from "zod";

export const createPatientSchema = z.object({
  cpf: z.string({ message: "CPF é obrigatório" }),
  name: z.string({ message: "Nome é obrigatório" }),
  birth_date: z.string({ message: "Data de Nascimento é obrigatório" }),
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido"),
  address: z.object(
    {
      zip_code: z.string({ message: "CEP é obrigatório" }),
      street: z.string({ message: "Rua é obrigatório" }),
      number: z.string({ message: "Número é obrigatório" }),
      complement: z.string().optional(),
      district: z.string({ message: "Bairro é obrigatório" }),
      city: z.string({ message: "Cidade é obrigatório" }),
      state: z.string({ message: "Estado é obrigatório" }).max(2),
      country: z.string({ message: "País é obrigatório" }),
    },
    { message: "Endereço é obrigatório" }
  ),
});

export const updatePatientSchema = z.object({
  cpf: z.string().optional(),
  name: z.string().optional(),
  birth_date: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  address: z.object({
    zip_code: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    district: z.string().optional(),
    city: z.string().optional(),
    state: z.string().max(2).optional(),
    country: z.string().optional(),
  }),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;

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
