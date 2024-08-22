import { Router } from "express";
import { PatientService } from "../services/PatientService";
import { PatientRepository } from "../repositories/PatientRepository";
import { PatientController } from "../controllers/PatientController";

const patientRouter = Router();

const patientRepository = new PatientRepository();
const patientService = new PatientService(patientRepository);
const patientController = new PatientController(patientService);

patientRouter.post(
  "/",
  patientController.createPatient.bind(patientController)
);
patientRouter.get("/", patientController.getPatients.bind(patientController));
patientRouter.get(
  "/:id",
  patientController.getPatientById.bind(patientController)
);
patientRouter.put(
  "/:id",
  patientController.updatePatient.bind(patientController)
);
patientRouter.delete(
  "/:id",
  patientController.deletePatient.bind(patientController)
);

export { patientRouter };
