import { linkGenerate, linkReroute } from '@/controllers';
import { validateAuth } from '@/middlewares';
import { AcronymRole } from '@/protocols';
import { Router } from 'express';

const linkRouter = Router();

linkRouter.get('/generate/:id',validateAuth([AcronymRole.US]),linkGenerate);
linkRouter.get('/:short',linkReroute);

export { linkRouter };
