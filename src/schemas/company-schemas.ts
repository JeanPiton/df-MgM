import { companySignUpParams } from '@/services';
import Joi from 'joi';

export const companySignUpSchema = Joi.object<companySignUpParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  contact: Joi.string().required()
});