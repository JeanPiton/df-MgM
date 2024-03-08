import { companyRepository } from "./company-repository";
import { superRepository } from "./super-repository";
import { userRepository } from "./user-repository";

async function findAllUsersByEmail(email: string){
    let user = await userRepository.findUserByEmail(email);
    
    if(!user){
        let company = await companyRepository.findCompanyByEmail(email);
        
        if(!company){
            let admin =  await superRepository.findSuperByEmail(email);
            
            return admin
        }
        return company
    }
    return user
}

export const usersRepository = {
    findAllUsersByEmail
}