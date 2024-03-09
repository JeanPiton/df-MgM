import { conflictCampaignError } from "@/errors";
import { campaignRepository } from "@/repositories";
import { Prisma } from "@prisma/client";

async function createCampaign(params: campaignCreateParams){
    const {name, desc, link, currency, points, prize} = params;
    let prizes = prize as Prisma.JsonArray;
    
    let campaign = await campaignRepository.findCampaignByName(name);
    if(campaign != null) throw conflictCampaignError(`${name} already exists`)
    
    let created = await campaignRepository.createCampaign(name,desc,link,currency,points,prizes)
    return created;
}

async function findCampaignsName(name: string){
    let campaigns = await campaignRepository.findCampaignByNameContain(name);
    return campaigns;
}

export const campaignService = {
    createCampaign,
    findCampaignsName
}

export type campaignCreateParams = {
    name: string,
    desc: string,
    link: string,
    currency: string,
    points: number,
    prize: {
        name: string,
        cost: number
    }[]
}