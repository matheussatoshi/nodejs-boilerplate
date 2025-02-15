import type { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response<Error> => {
  if (error instanceof Error) {
    return response.json({
      error: error.message,
    });
  }

  return response.json({
    error: "Internal Servidor Error.",
  });
};
