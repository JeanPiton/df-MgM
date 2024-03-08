import { userSignUpPost } from '@/controllers/user-controller';
import { validateBody } from '@/middlewares';
import { userSignUpSchema } from '@/schemas';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/sign-up',validateBody(userSignUpSchema),userSignUpPost);

export { userRouter };
