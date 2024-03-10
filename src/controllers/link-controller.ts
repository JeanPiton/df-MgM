import { linkService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function linkGenerate(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.locals.user.id
  const path = req.headers.host;
  
  const result = await linkService.createLink(id, userId, path);

  return res.status(httpStatus.CREATED).send(result);
}

export async function linkReroute(req: Request, res:Response) {
    const { short } = req.params;

    const result = await linkService.getUrlLink(short);

    res.redirect(result);
}