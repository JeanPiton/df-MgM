import { ApplicationError } from '@/protocols';

export function invalidUserError(details: string): ApplicationError {
  return {
    name: 'InvalidUserError',
    message: `Invalid user: ${details}`,
  };
}