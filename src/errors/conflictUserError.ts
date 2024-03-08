import { ApplicationError } from '@/protocols';

export function conflictUserError(details: string): ApplicationError {
  return {
    name: 'ConflictUserError',
    message: `Conflicting user: ${details}`,
  };
}