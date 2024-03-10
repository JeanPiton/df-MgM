import { invalidDataError, notFoundError } from "@/errors";
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

async function getUrlLink(short: string){
    if(!short) throw invalidDataError("short missing");
    if(short.length != 8) throw invalidDataError("invalid short format");
    
    let link = await linkRepository.findLinkByShort(short);
    if(!link) throw notFoundError("link not found");
    
    let destiny = await linkRepository.requestLink(short);
   
    return destiny;
}

export const linkService = {
    createLink,
    getUrlLink
}