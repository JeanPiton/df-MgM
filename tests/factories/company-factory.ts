import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function createCompany({
    name = faker.person.firstName(),
    contact = faker.lorem.lines(),
    email = faker.internet.email(),
    password = faker.number.hex()
}){
    return await prisma.company.create({
        data: {
            name,
            contact,
            email,
            password
        }
    })
}