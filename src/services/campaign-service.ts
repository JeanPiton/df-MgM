import { conflictCampaignError, invalidDataError } from "@/errors";
import { campaignRepository } from "@/repositories";
import { Prisma, User } from "@prisma/client";
import { shopItem, userService } from "./user-service";

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

async function buyCampaignItem(idCamp: string, itemId: number, user: User){
    let campaign = await campaignRepository.findCampaignById(idCamp);
    if(!campaign) throw invalidDataError("campaign not found");

    if(!Number.isInteger(itemId)) throw invalidDataError("item invalid");
    let item = await campaignRepository.findCampaignItem(idCamp, itemId) as shopItem;
    if(!item) throw invalidDataError("item not found");
    
    let itemBought = await userService.userBuyItem(user, item, campaign.currency);

    return itemBought;
}

export const campaignService = {
    createCampaign,
    findCampaignsName,
    buyCampaignItem
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