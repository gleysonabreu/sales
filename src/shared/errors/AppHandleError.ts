import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import AppError from './AppError';

interface ValidationErrorsYup {
  [key: string]: string[];
}

const AppHandleError: ErrorRequestHandler = (
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    });
  }

  if (error instanceof ValidationError) {
    const errors: ValidationErrorsYup = {};
    error.inner.forEach(err => {
      if (err.path) errors[err.path] = err.errors;
    });

    return response.status(400).json({
      message: 'Validation fails',
      errors,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: `Server Internal Error: ${error.message}`,
  });
};

export default AppHandleError;
