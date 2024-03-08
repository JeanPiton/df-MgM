import { prisma } from "@/config";

async function findAllUsersByEmail(email: String){
    let user = await prisma.user.findFirst({where:{email: `${email}`}})
    
    if(!user){
        let company = await prisma.company.findFirst({where:{email: `${email}`}})
        
        if(!company){
            let admin =  await prisma.superUser.findFirst({where:{email: `${email}`}})
            
            return admin
        }
        return company
    }
    return user
}

export const usersRepository = {
    findAllUsersByEmail
}