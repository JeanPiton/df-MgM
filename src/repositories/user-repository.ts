import { prisma } from "@/config";

async function findUserByEmail(email: string){
    let user = await prisma.user.findFirst({where:{email: `${email}`}});;
    return user
}

async function createUser(email: string, password: string, name: string) {
    let user = await prisma.user.create({data:{
        email: `${email}`,
        name: `${name}`,
        password: `${password}`
    }});
    return user;
}

export const userRepository = {
    findUserByEmail,
    createUser
}