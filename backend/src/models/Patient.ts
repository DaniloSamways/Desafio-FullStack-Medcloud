import { z } from "zod";

export const createPatientSchema = z.object({
  name: z.string({message: "Nome é obrigatório"}),
  birth_date: z.string({message: "Data de Nascimento é obrigatório"}),
  email: z.string({message: "Email é obrigatório"}).email("Email inválido"),
  address: z.string({message: "Endereço é obrigatório"}),
});

export const updatePatientSchema = z.object({
  name: z.string().optional(),
  birth_date: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  address: z.string().optional(),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;

export interface Patient {
  id: string;
  name: string;
  birth_date: string;
  email: string;
  address: string;
}
