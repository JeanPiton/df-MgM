import { ApplicationError } from '@/protocols';

export function conflictCampaignError(details: string): ApplicationError {
  return {
    name: 'ConflictCampaignError',
    message: `Conflicting campaign: ${details}`,
  };
}