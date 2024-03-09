import { prisma } from "@/config";

async function createLink(userId: string, url: string, short: string, currency: string, points: number){
    let created = await prisma.link.create({data: {
        userId: userId,
        url: url,
        short: short,
        reward: {currency: currency, points: points}
    }})
    return created;
}

export const linkRepository = {
    createLink
}