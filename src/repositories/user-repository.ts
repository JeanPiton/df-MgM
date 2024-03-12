import { prisma } from "@/config";
import { linkReward } from "./link-repository";

async function findUserByEmail(email: string){
    let user = await prisma.user.findFirst({where:{email: `${email}`}});;
    return user
}

async function createUser(email: string, password: string, name: string) {
    let user = await prisma.user.create({data:{
        email: email,
        name: name,
        password: password
    }});
    return user;
}

async function findUserByToken(token: string){
    let user = await prisma.user.findFirst({where:{token: token}});
    return user;
}

async function findUserById(id: string, pInstance=prisma){
    let user = await pInstance.user.findUnique({where:{id:id}});
    return user;
}

async function setUserCurrency(id: string, wallet: linkReward[], pInstance){
    await pInstance.user.update({where: {id: id},
        data: {
            currency: wallet
        }
    })
}

async function setUserInventory(id: string, inventory: {name: string, amount: number}[], pInstance){
    await pInstance.user.update({where: {id: id},
        data: {
            inventory: inventory
        }
    })
}

export const userRepository = {
    findUserByEmail,
    createUser,
    findUserByToken,
    findUserById,
    setUserCurrency,
    setUserInventory
}