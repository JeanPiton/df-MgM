import { prisma } from "@/config";
import { UserRole } from "@/protocols";

async function createSession(role: UserRole, token: String, email: String) {
    let session = await prisma.$runCommandRaw({update: role, updates:[{q:{email: `${email}`},u:{$set:{token: `${token}`}}}]})
    return session;
}



export const authenticationRepository = {
    createSession,
}