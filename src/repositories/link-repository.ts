import { prisma } from "@/config";
import { userService } from "@/services";

async function createLink(userId: string, url: string, short: string, currency: string, points: number){
    let created = await prisma.link.create({data: {
        userId: userId,
        url: url,
        short: short,
        reward: {currency: currency, points: points}
    }})
    return created;
}

async function findLinkByShort(short: string){
    let link = await prisma.link.findFirst({where: {short: short}});
    return link;
}

async function requestLink(short: string){
    let url = await prisma.$transaction(async (pt) => {
        let link = await pt.link.findFirst({where:{short: short}});

        let reward:{currency:string, points:number} = link.reward as linkReward;
        await userService.receiveReward(link.userId,reward,pt);
        
        await deleteLink(link.id,pt);
        
        return link.url;
    });
    return url;
}

async function deleteLink(id: string, pInstance){
    await pInstance.link.delete({where: {id: id}});
}

export const linkRepository = {
    createLink,
    findLinkByShort,
    requestLink,
    deleteLink
}

export type linkReward = {
    currency: string,
    points: number
}