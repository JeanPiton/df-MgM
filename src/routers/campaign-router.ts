import { campaignCreate, campaignNameSearch, itemBuy } from '@/controllers';
import { validateAuth, validateBody } from '@/middlewares';
import { AcronymRole } from '@/protocols';
import { campaignCreateSchema } from '@/schemas';
import { Router } from 'express';

const campaignRouter = Router();

campaignRouter.post('/create',validateBody(campaignCreateSchema),validateAuth([AcronymRole.SU,AcronymRole.CP]),campaignCreate);
campaignRouter.get('/name',campaignNameSearch);
campaignRouter.get('/buy/:id/:item',validateAuth([AcronymRole.US]),itemBuy);

export { campaignRouter };
