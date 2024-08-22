import { paginationSchema } from "../schemas/paginationSchema";
import {
  createPatientSchema,
  updatePatientSchema,
} from "../schemas/patientSchema";
import { PatientService } from "../services/PatientService";
import { NextFunction, Request, Response } from "express";

export class PatientController {
  constructor(private service: PatientService) {}

  async createPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = createPatientSchema.parse(req.body);

      const createdPatient = await this.service.createPatient(requestData);
      return res.status(201).json(createdPatient);
    } catch (error: any) {
      next(error);
    }
  }

  async getPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = paginationSchema.parse(req.query);
      const patients = await this.service.getPatients(requestData);
      return res.status(201).json(patients);
    } catch (error: any) {
      next(error);
    }
  }

  async getPatientById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const patient = await this.service.getPatientById(id);
      return res.status(201).json(patient);
    } catch (error: any) {
      next(error);
    }
  }

  async updatePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = updatePatientSchema.parse(req.body);

      const id = req.params.id;
      const updatedPatient = await this.service.updatePatient(id, requestData);
      return res.status(201).json(updatedPatient);
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  async deletePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.service.deletePatient(id);
      return res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
