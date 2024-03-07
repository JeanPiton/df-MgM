import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient;

async function main() {
    let superUser = await prisma.superUser.findFirst();
    if(!superUser){
        let pass = process.env.ADMIN_PASSWORD
        let email = process.env.ADMIN_EMAIL
        if(pass == null || email == null){
            throw new Error("Email/password not found");
        }
        let password = bcrypt.hashSync(`${process.env.ADMIN_PASSWORD}`,10);
        superUser = await prisma.superUser.create({
            data: {
                email: `${process.env.ADMIN_EMAIL}`,
                password: password,
                name: "admin"
            }
        })
    }
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });