import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function createUser({
    name = faker.person.firstName(),
    email = faker.internet.email(),
    password = faker.number.hex()
}){
    return await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
}