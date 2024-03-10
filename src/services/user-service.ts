import { conflictUserError, invalidUserError } from "@/errors";
import { linkReward, userRepository, usersRepository } from "@/repositories";
import bcrypt from 'bcrypt';

async function createUser(params: userSignUpParams){
    const {email, password, name} = params;
   
    let user = await usersRepository.findAllUsersByEmail(email);
    if(user != null) throw conflictUserError("email already in use");
    
    const hash = bcrypt.hashSync(password,10);
    let created = await userRepository.createUser(email, hash, name);
    return created;
}

async function receiveReward(userId: string, reward: linkReward, pt){
    let user = await userRepository.findUserById(userId,pt);
    if(!user) throw invalidUserError("User not found");
    let newCurrency:linkReward[] = user.currency as linkReward[]
    let index = newCurrency.findIndex((item:linkReward) => item.currency === reward.currency);
    index === -1?newCurrency.push(reward):newCurrency[index].points +=  reward.points;
    await userRepository.giveUserReward(userId,newCurrency,pt);
}

export const userService = {
    createUser,
    receiveReward
}

export type userSignUpParams = {
    email: string,
    password: string,
    name: string
}