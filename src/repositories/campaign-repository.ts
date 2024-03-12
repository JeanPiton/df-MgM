import { prisma } from "@/config";
import { inventoryItem } from "@/services";
import { Prisma } from "@prisma/client";
import { linkReward } from "./link-repository";
import { userRepository } from "./user-repository";

async function findCampaignByName(name: string){
    let campaign = await prisma.campaign.findFirst({where:{name: name}});
    return campaign;
}

async function findCampaignByNameContain(name: string){
    let campaign = await prisma.campaign.findMany({where:{name: {contains: name}}});
    return campaign;
}

async function findCampaignById(id: string){
    let campaign = await prisma.campaign.findUnique({where: {id: id}});
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

async function findCampaignItem(idCamp: string, idItem: number) {
    let campaign = await prisma.campaign.findUnique({where: {id: idCamp}});
    return campaign.prize[idItem];
}

async function buyCampaignItem(userId:string, wallet: linkReward[], inventory: inventoryItem[]){
    await prisma.$transaction(async (pt) => {
        await userRepository.setUserCurrency(userId, wallet, pt);
        await userRepository.setUserInventory(userId, inventory, pt);
    });
}

export const campaignRepository = {
    findCampaignByName,
    findCampaignByNameContain,
    findCampaignById,
    findCampaignItem,
    buyCampaignItem,
    createCampaign
}