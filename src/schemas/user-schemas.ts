import { userSignUpParams } from '@/services';
import Joi from 'joi';

export const userSignUpSchema = Joi.object<userSignUpParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required()
});