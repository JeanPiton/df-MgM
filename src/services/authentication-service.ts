import { invalidUserError } from "@/errors";
import { ShortRole, UserRole } from "@/protocols";
import { authenticationRepository, usersRepository } from "@/repositories";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function signIn(params: SignInParams){
    const { email, password } = params;
    
    let user = await getUserOrFail(email);
    await validateUserPasswordOrFail(password, user.password);
    
    let short = shortRole(user.role);
    const token = `${short}${uuid()}`;
    
    let role = collectionRole(user.role);
    await authenticationRepository.createSession(role,token,email);

    return token;
}

async function getUserOrFail(email: string) {
    const user = await usersRepository.findAllUsersByEmail(email);
    if(!user) throw invalidUserError("email/password not found");
    return user;
}

async function validateUserPasswordOrFail(password: string, userPassword: string){
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if(!isPasswordValid) throw invalidUserError("email/password not found");
}

function shortRole(role: string){
    if(role === ShortRole.SU) return "SU"
    if(role === ShortRole.CP) return "CP"
    if(role === ShortRole.US) return "US"
    throw new Error("role error")
}

function collectionRole(role: string){
    if(role === ShortRole.SU) return UserRole.SU
    if(role === ShortRole.CP) return UserRole.CP
    if(role === ShortRole.US) return UserRole.US
    throw new Error("role error 2")
}

export const authenticationService = {
    signIn,
}

export type SignInParams = {
    email: string,
    password: string
}