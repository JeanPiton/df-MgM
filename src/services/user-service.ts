import { conflictUserError, invalidAmountError, invalidUserError } from "@/errors";
import { campaignRepository, linkReward, userRepository, usersRepository } from "@/repositories";
import { User } from "@prisma/client";
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
    await userRepository.setUserCurrency(userId,newCurrency,pt);
}

async function userBuyItem(user: User, itemShop: shopItem, itemCurrency: string){
    let wallet = user.currency as linkReward[];
    let inventory = user.inventory as inventoryItem[];

    let wIndex = wallet.findIndex((item:linkReward) => item.currency === itemCurrency);
    if(wIndex == -1 || wallet[wIndex].points < itemShop.cost){
        throw invalidAmountError(`Not enough ${itemCurrency}`);
    }else{
        wallet[wIndex].points -= itemShop.cost;
    }

    let iIndex = inventory.findIndex((item:inventoryItem) => item.name === itemShop.name);
    delete itemShop.cost;
    iIndex === -1?inventory.push({...itemShop, amount:1}):inventory[iIndex].amount++;

    await campaignRepository.buyCampaignItem(user.id,wallet,inventory);

    return iIndex === -1?inventory[inventory.length-1]:inventory[iIndex];
}

export const userService = {
    createUser,
    receiveReward,
    userBuyItem
}

export type userSignUpParams = {
    email: string,
    password: string,
    name: string
}

export type shopItem = {
    name: string,
    cost: number
}

export type inventoryItem = {
    name: string,
    amount: number
}