import { companySignUpPost } from '@/controllers';
import { validateAuth, validateBody } from '@/middlewares';
import { AcronymRole } from '@/protocols';
import { companySignUpSchema } from '@/schemas';
import { Router } from 'express';

const companyRouter = Router();

companyRouter.post('/sign-up',validateBody(companySignUpSchema),validateAuth([AcronymRole.SU]),companySignUpPost);

export { companyRouter };
