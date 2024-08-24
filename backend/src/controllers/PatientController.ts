import { paginationSchema } from "../schemas/paginationSchema";
import {
  createPatientSchema,
  findPatientById,
  findPatientSchema,
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
      const requestData = findPatientById.parse(req.params);
      const patient = await this.service.getPatientById(requestData.id);
      return res.status(201).json(patient);
    } catch (error: any) {
      next(error);
    }
  }

  async updatePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = updatePatientSchema.parse(req.body);

      const requestId = findPatientById.parse(req.params);

      const updatedPatient = await this.service.updatePatient(requestId.id, requestData);
      return res.status(201).json(updatedPatient);
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  async deletePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = findPatientById.parse(req.params);
      await this.service.deletePatient(requestData.id);
      return res.status(200).send();
    } catch (error: any) {
      next(error);
    }
  }

  async findPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = findPatientSchema.parse(req.query);
      const patients = await this.service.findPatient(requestData.filter, requestData.limit);
      return res.status(201).json(patients);
    } catch (error: any) {
      next(error);
    }
  }
}
