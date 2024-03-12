import { ApplicationError } from '@/protocols';

export function invalidAmountError(details: string): ApplicationError {
  return {
    name: 'InvalidAmountError',
    message: `Invalid amount: ${details}`,
  };
}