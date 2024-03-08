import { ApplicationError, RequestError } from '@/protocols';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export function handleApplicationErrors(
    err: RequestError | ApplicationError | Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {

    if(err.name === 'InvalidDataError'){
      return res.status(httpStatus.BAD_REQUEST).send({
        message: err.message
      })
    }

    if(err.name === 'InvalidUserError'){
      return res.status(httpStatus.BAD_REQUEST).send({
        message: err.message
      })
    }
  
    if (err.hasOwnProperty('status') && err.name === 'RequestError') {
      return res.status((err as RequestError).status).send({
        message: err.message,
      });
    }
  
    if (err.name.includes('PrismaClient')) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Database error",
      });
    }
  
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'InternalServerError',
      message: 'Internal Server Error',
    });
}