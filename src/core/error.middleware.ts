import { NextFunction, Request, Response } from "express";

// Define a custom error interface with optional statusCode
interface CustomError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;

  const errorMessages: { [key: number]: string } = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    429: "Too Many Requests",
    500: "Internal Server Error",
  };

  const message =
    err.message || errorMessages[statusCode] || "An error occurred";

  res.status(statusCode).json({
    statusCode,
    message,
  });
};
