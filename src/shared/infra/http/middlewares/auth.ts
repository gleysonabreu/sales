import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { verify } from '../../../services/Token';

interface IJwt {
  id: string;
  iat: number;
  exp: number;
}

const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers;
  if (!authorization) throw new AppError('JWT is missing');

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = verify(token) as IJwt;
    request.user = {
      id: decodedToken.id,
    };
    return next();
  } catch (error) {
    throw new AppError('Invalid token.');
  }
};

export default authMiddleware;
