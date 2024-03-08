import { userService, userSignUpParams } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function userSignUpPost(req: Request, res: Response) {
  const { email, password, name } = req.body as userSignUpParams;
  
  const result = await userService.createUser({email, password, name});

  return res.status(httpStatus.CREATED).send(result);
}