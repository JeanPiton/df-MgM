import { invalidUserError } from "@/errors";
import { userRepository } from "@/repositories";
import bcrypt from 'bcrypt';

async function createUser(params: userSignUpParams){
    const {email, password, name} = params;
   
    let user = await userRepository.findUserByEmail(email);
    if(user != null) throw invalidUserError("email is already in use");
    
    const hash = bcrypt.hashSync(password,10);
    let created = await userRepository.createUser(email, hash, name);
    return created;
}

export const userService = {
    createUser
}

export type userSignUpParams = {
    email: string,
    password: string,
    name: string
}