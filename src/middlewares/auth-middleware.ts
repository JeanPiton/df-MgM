import { authenticationError } from "@/errors";
import { AcronymRole } from "@/protocols";
import { companyRepository, superRepository, userRepository } from "@/repositories";
import { NextFunction, Request, Response } from 'express';

export function validateAuth(roles: AcronymRole[]){
    return async(req:Request, res:Response, next:NextFunction) => {
        const {authorization} = req.headers;
        const rawToken = authorization?.replace("Bearer ","")

        if(!rawToken) throw authenticationError("user not logged in");

        const role = rawToken.slice(0,2);

        if(!roles.includes(role)) throw authenticationError("user dont have access");
        
        let auth
        switch (role) {
            case AcronymRole.SU:
                auth = await superRepository.findSuperByToken(rawToken);
                break;
            case AcronymRole.CP:
                auth = await companyRepository.findCompanyByToken(rawToken);
                break;
            case AcronymRole.US:
                auth = await userRepository.findUserByToken(rawToken);
                break;         
        }

        if(!auth) throw authenticationError("invalid credential");
        
        next();
    }
}
