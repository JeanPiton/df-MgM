import { campaignCreateParams, campaignService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function campaignCreate(req: Request, res: Response) {
  const { name, desc, link, currency, points, prize } = req.body as campaignCreateParams;
  
  const result = await campaignService.createCompany({name, desc, link, currency, points, prize});

  return res.status(httpStatus.CREATED).send(result);
}