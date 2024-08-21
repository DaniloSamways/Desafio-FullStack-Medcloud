import { createPatientSchema, updatePatientSchema } from "../models/Patient";
import { PatientService } from "../services/PatientService";
import { NextFunction, Request, Response } from "express";

export class PatientController {
  constructor(private service: PatientService) {}

  async createPatient(req: Request, res: Response, next: NextFunction) {
    try {
      createPatientSchema.parse(req.body);

      const createdPatient = await this.service.createPatient(req.body);
      return res.status(201).json(createdPatient);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const patients = await this.service.getAllPatients();
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
      updatePatientSchema.parse(req.body);

      const id = req.params.id;
      const updatedPatient = await this.service.updatePatient(id, req.body);
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
