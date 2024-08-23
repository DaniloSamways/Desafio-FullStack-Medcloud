import { NotFoundRecord } from "../errors/NotFoundRecord";
import {
  CreatePatientInput,
  UpdatePatientInput,
} from "../schemas/patientSchema";
import { PatientRepository } from "../repositories/PatientRepository";
import { PaginationSchema } from "../schemas/paginationSchema";
import { Patient } from "../models/Patient";
import { getPatientsResponse } from "../@types/patient";

export class PatientService {
  constructor(private repository: PatientRepository) {}

  async createPatient(data: CreatePatientInput): Promise<Patient> {
    const createdPatient = await this.repository.createPatient(data);
    return createdPatient;
  }

  async getPatients(data: PaginationSchema): Promise<getPatientsResponse> {
    const patients = await this.repository.getPatients(data);
    return patients;
  }

  async getPatientById(id: string): Promise<Patient> {
    const patientExists = await this.repository.getPatientById(id);

    if (!patientExists) {
      throw new NotFoundRecord(`Paciente não encontrado`);
    }

    const patient = await this.repository.getPatientById(id);
    return patient;
  }

  async updatePatient(id: string, data: UpdatePatientInput): Promise<Patient> {
    const patientExists = await this.repository.getPatientById(id);

    if (!patientExists) {
      throw new NotFoundRecord(`Paciente não encontrado`);
    }

    const updatedPatient = await this.repository.updatePatient(id, data);
    return updatedPatient;
  }

  async deletePatient(id: string): Promise<void> {
    const patientExists = await this.repository.getPatientById(id);

    if (!patientExists) {
      throw new NotFoundRecord(`Paciente não encontrado`);
    }

    await this.repository.deletePatient(id);
  }

  async findPatient(filter: string, limit: number): Promise<Patient[]> {
    const patients = await this.repository.findPatient(filter, limit);
    return [...patients];
  }
}
