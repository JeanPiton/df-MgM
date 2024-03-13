import { ShortRole } from '@/protocols';
import { campaignCreateParams, campaignService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function campaignCreate(req: Request, res: Response) {
  let { companyId, name, desc, link, currency, points, prize } = req.body as campaignCreateParams;
  const user = req.locals.user;
  companyId = user.role === ShortRole.SU?companyId:user.id;
  
  const result = await campaignService.createCampaign({companyId, name, desc, link, currency, points, prize});

  return res.status(httpStatus.CREATED).send(result);
}

export async function campaignNameSearch(req: Request, res: Response) {
  const { name } = req.query;

  const result = await campaignService.findCampaignsName(name);

  return res.status(httpStatus.OK).send(result);
}

export async function itemBuy(req: Request, res: Response) {
  const { id, item } = req.params;
  const user = req.locals.user;

  const result = await campaignService.buyCampaignItem(id, parseInt(item), user);

  return res.status(httpStatus.OK).send(result);
}