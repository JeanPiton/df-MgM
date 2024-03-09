import { invalidDataError } from "@/errors";
import { campaignRepository, linkRepository } from "@/repositories";
import { nanoid } from 'nanoid';

async function createLink(id: string, userId: string, path: string){
    if(!id) throw invalidDataError("campaign id missing");
    if(id.length < 24) throw invalidDataError("id format invalid")
    let campaign = await campaignRepository.findCampaignById(id);
    if(!campaign) throw invalidDataError(`campaign not found`);
    const {link, currency, points} = campaign;
    
    let short = nanoid(8);
    
    let created = await linkRepository.createLink(userId, link, short, currency, points);
    return `${path}/link/${short}`;
}

export const linkService = {
    createLink
}