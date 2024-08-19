import { NotFoundRecord } from "../errors/NotFoundRecord";
import { CreatePatientInput, Patient, UpdatePatientInput } from "../models/Patient";
import { PatientRepository } from "../repositories/PatientRepository";

export class PatientService {
  constructor (private repository: PatientRepository) {}

  async createPatient(data: CreatePatientInput): Promise<Patient> {
    const createdPatient = await this.repository.createPatient(data);
    return createdPatient;
  }

  async getAllPatients(): Promise<Patient[]> {
    const patients = await this.repository.getAllPatients();
    return patients;
  }

  async getPatientById(id: string): Promise<Patient> {
    const patientExists = await this.repository.getPatientById(id);

    if (!patientExists) {
      throw new NotFoundRecord(`Patient not found`);
    }

    const patient = await this.repository.getPatientById(id);
    return patient;
  }

  async updatePatient(id: string, data: UpdatePatientInput): Promise<Patient> {
    const patientExists = await this.repository.getPatientById(id);

    if (!patientExists) {
      throw new NotFoundRecord(`Patient not found`);
    }

    const updatedPatient = await this.repository.updatePatient(id, data);
    return updatedPatient;
  }

  async deletePatient(id: string): Promise<void> {
    const patientExists = await this.repository.getPatientById(id);

    if (!patientExists) {
      throw new NotFoundRecord(`Patient not found`);
    }
    
    await this.repository.deletePatient(id);
  }
}