import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findCampaignByName(name: string){
    let campaign = await prisma.campaign.findFirst({where:{name: name}});
    return campaign;
}

async function findCampaignByNameContain(name: string){
    let campaign = await prisma.campaign.findMany({where:{name: {contains: name}}});
    return campaign;
}

async function createCampaign(name: string, desc: string, link: string, currency: string, points: number, prize: Prisma.JsonArray){
    let campaign = await prisma.campaign.create({data:{
        name: name,
        desc: desc,
        link: link,
        currency: currency,
        points: points,
        prize: prize
    }});
    return campaign;
}

export const campaignRepository = {
    findCampaignByName,
    findCampaignByNameContain,
    createCampaign
}