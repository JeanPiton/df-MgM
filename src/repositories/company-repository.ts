import { prisma } from "@/config";

async function findCompanyByEmail(email: string){
    let company = await prisma.company.findFirst({where:{email:`${email}`}});
    return company;
}

async function createCompany(email: string, password: string, name: string, contact: string){
    let company = await prisma.company.create({data:{
        email: email,
        password: password,
        name: name,
        contact: contact,
    }});
    return company;
}

async function findCompanyByToken(token: string){
    let company = await prisma.company.findFirst({where:{token: token}});
    return company;
}

async function findCompanyById(id: string){
    let company = await prisma.company.findUnique({where:{id: id}});
    return company;
}

export const companyRepository = {
    findCompanyByEmail,
    createCompany,
    findCompanyByToken,
    findCompanyById
}