import { campaignCreateParams } from '@/services';
import Joi from 'joi';

export const campaignCreateSchema = Joi.object<campaignCreateParams>({
  companyId: Joi.string().length(24).optional(),
  name: Joi.string().required(),
  desc: Joi.string().required(),
  link: Joi.string().required(),
  currency: Joi.string().default("points"),
  points: Joi.number().integer().positive().default(1),
  prize: Joi.array().items(Joi.object().keys({
    name: Joi.string().required(),
    cost: Joi.number().integer().positive().required()
  }).unknown(true)).min(1).required()
});