import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { NotFoundRecord } from "./NotFoundRecord";
import { ZodError } from "zod";

export class GlobalErrorHandler {
  handle(
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof NotFoundRecord) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
