import { companyService, companySignUpParams } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function companySignUpPost(req: Request, res: Response) {
  const { email, password, name, contact } = req.body as companySignUpParams;
  
  const result = await companyService.createCompany({email, password, name, contact});

  return res.status(httpStatus.CREATED).send(result);
}