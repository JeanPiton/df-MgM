import { ApplicationError, RequestError } from '@/protocols';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export function handleApplicationErrors(
    err: RequestError | ApplicationError | Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {

    if(err.name === 'AuthenticationError'){
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: err.message
      })
    }

    if(err.name === 'InvalidAmountError'){
      return res.status(httpStatus.BAD_REQUEST).send({
        message: err.message
      })
    }

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

    if(err.name === 'ConflictUserError'){
      return res.status(httpStatus.CONFLICT).send({
        message: err.message
      })
    }

    if(err.name === 'ConflictCampaignError'){
      return res.status(httpStatus.CONFLICT).send({
        message: err.message
      })
    }

    if(err.name === 'NotFoundError'){
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message
      })
    }
  
    if (err.hasOwnProperty('status') && err.name === 'RequestError') {
      return res.status((err as RequestError).status).send({
        message: err.message,
      });
    }
  
    if (err.name.includes('PrismaClient')) {
      console.log(err);
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