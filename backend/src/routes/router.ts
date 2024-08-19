import { ErrorRequestHandler, NextFunction, Request, Response, Router } from "express";
import { patientRouter } from "./patientRouter";
import { GlobalErrorHandler } from "../errors/GlobalErrorHandler";

const router = Router();

router.use("/patients", patientRouter);

// Not Found route
router.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// Global Error Handler route
const globalErrorHandler = new GlobalErrorHandler();
router.use(globalErrorHandler.handle.bind(globalErrorHandler));

export { router };