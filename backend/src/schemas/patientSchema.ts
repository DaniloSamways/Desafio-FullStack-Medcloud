import { z } from "zod";

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
  address: z.object(
    {
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
    },
    { message: "Endereço é obrigatório" }
  ),
});

export const updatePatientSchema = z.object({
  cpf: z.preprocess(
    (cpf: unknown) => (cpf as string).replace(/\D/g, ""),
    z.string().optional()
  ),
  name: z.string().optional(),
  birth_date: z.preprocess(
    (birth_date: unknown) => new Date(birth_date as string),
    z.date().optional()
  ),
  email: z.string().email("Email inválido").optional(),
  address: z
    .object({
      zip_code: z.preprocess(
        (zip_code: unknown) => (zip_code as string).replace(/\D/g, ""),
        z.string().optional()
      ),
      street: z.string().optional(),
      number: z.string().optional(),
      complement: z.string().optional(),
      district: z.string().optional(),
      city: z.string().optional(),
      state: z.string().max(2).optional(),
      country: z.string().optional(),
    })
    .optional(),
});

export const findPatientSchema = z.object({
  filter: z
    .string({ message: "Filtro é obrigatório" })
    .min(3, "Filtro deve ter no mínimo 3 caracteres"),
  limit: z.coerce.number().int().positive().default(10),
});

export const findPatientById = z.object({
  id: z
    .string({ message: "Id é obrigatório" })
    .uuid({ message: "Id inválido" }),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
export type FindPatientInput = z.infer<typeof findPatientSchema>;
export type FindPatientByIdInput = z.infer<typeof findPatientById>;
