import { prisma } from "@/config";

async function findSuperByEmail(email: string){
    let superUser = await prisma.superUser.findFirst({where:{email: email}});
    return superUser;
}

async function findSuperByToken(token: string){
    let superUser = await prisma.superUser.findFirst({where:{token: token}});
    return superUser;
}

export const superRepository = {
    findSuperByEmail,
    findSuperByToken
}