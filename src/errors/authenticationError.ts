import { ApplicationError } from '@/protocols';

export function authenticationError(details: string): ApplicationError {
  return {
    name: 'AuthenticationError',
    message: `authentication error: ${details}`,
  };
}