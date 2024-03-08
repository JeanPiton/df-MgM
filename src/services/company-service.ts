import { conflictUserError } from "@/errors";
import { companyRepository, usersRepository } from "@/repositories";
import bcrypt from 'bcrypt';

async function createCompany(params: companySignUpParams){
    const {email, password, name, contact} = params;

    let company = await usersRepository.findAllUsersByEmail(email);
    if(company != null) throw conflictUserError("email already in use");
    
    const hash = bcrypt.hashSync(password,10);
    let created = await companyRepository.createCompany(email,hash,name,contact);
    return created;
}

export const companyService = {
    createCompany
}

export type companySignUpParams = {
    email: string,
    password: string,
    name: string,
    contact: string
}