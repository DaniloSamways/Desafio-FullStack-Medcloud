import { pg } from "../database/pg";
import {
  CreatePatientInput,
  Patient,
  UpdatePatientInput,
} from "../models/Patient";

export class PatientRepository {
  async createPatient(data: CreatePatientInput): Promise<Patient> {
    const createdPatient = await pg
      .query<Patient>(
        "INSERT INTO patient (name, email, cpf, birth_date, address) VALUES ($1, $2, $3, $4) RETURNING *",
        [data.name, data.email, data.cpf, data.birth_date, JSON.stringify(data.address)]
      )
      ?.then((res) => {
        return res.rows[0];
      });

    return createdPatient;
  }

  async getAllPatients(): Promise<Patient[]> {
    const patients = await pg
      .query<Patient>("SELECT * FROM patient")
      ?.then((res) => res.rows);
    return patients;
  }

  async getPatientById(id: string): Promise<Patient> {
    const patient = await pg
      .query<Patient>("SELECT * FROM patient WHERE id = $1", [id])
      ?.then((res) => res.rows[0]);
    return patient;
  }

  async updatePatient(id: string, data: UpdatePatientInput): Promise<Patient> {
    const updateFields = Object.keys(data).map((key, index) => {
      if (key === "address") {
        return `${key} = $${key}::jsonb || ${JSON.stringify(data[key])} `;
      }

      return `${key} = $${index + 2} `;
    });

    const updatedPatient = await pg
      .query<Patient>(
        `UPDATE patient SET ${updateFields} WHERE id = $1 RETURNING *`,
        [id, ...Object.values(data)]
      )
      ?.then((res) => res.rows[0]);

    return updatedPatient;
  }

  async deletePatient(id: string): Promise<void> {
    await pg.query("DELETE FROM patient WHERE id = $1", [id]);
  }
}
