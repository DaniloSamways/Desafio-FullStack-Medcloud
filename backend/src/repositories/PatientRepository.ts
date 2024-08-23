import { pg } from "../database/pg";
import {
  CreatePatientInput,
  UpdatePatientInput,
} from "../schemas/patientSchema";
import { PaginationSchema } from "../schemas/paginationSchema";
import { Patient } from "../models/Patient";
import { getPatientsResponse } from "../@types/patient";

export class PatientRepository {
  async createPatient(data: CreatePatientInput): Promise<Patient> {
    const createdPatient = await pg
      .query<Patient>(
        "INSERT INTO patient (name, email, cpf, birth_date, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          data.name,
          data.email,
          data.cpf,
          data.birth_date,
          JSON.stringify(data.address),
        ]
      )
      ?.then((res) => {
        return res.rows[0];
      });

    return createdPatient;
  }

  async getPatients(data: PaginationSchema): Promise<getPatientsResponse> {
    let query = "SELECT * FROM patient ORDER BY createdAt DESC";

    if (data) {
      query += ` LIMIT ${data.limit} OFFSET ${(data.page - 1) * data.limit}`;
    }

    const totalResult = await pg.query("SELECT COUNT(*) FROM patient");
    const totalRecord = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(totalRecord / data.limit);

    const patients = await pg.query<Patient>(query)?.then((res) => res.rows);
    return {
      data: patients,
      page: data.page,
      limit: data.limit,
      total: totalRecord,
      pages: totalPages,
    };
  }

  async getPatientById(id: string): Promise<Patient> {
    const patient = await pg
      .query<Patient>("SELECT * FROM patient WHERE id = $1", [id])
      ?.then((res) => res.rows[0]);
    return patient;
  }

  async updatePatient(id: string, data: UpdatePatientInput): Promise<Patient> {
    const updateFields = Object.keys(data).map((key, index) => {
      if (!key) return;

      if (key === "address") {
        const address = data[key];
        delete data["address"];
        return `${key} = ${key}::jsonb || '${JSON.stringify(address)}' `;
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

  async findPatient(filter: string, limit: number): Promise<Patient[]> {
    const patients = await pg
      .query(
        `SELECT * FROM patient WHERE 
          name ILIKE $1 OR 
          cpf ILIKE $1 OR 
          email ILIKE $1
        ORDER BY createdAt DESC
        LIMIT $2`,
        [`%${filter}%`, limit]
      )
      .then((res) => res.rows);

    return patients;
  }
}
