import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
const Jwt_Screet="chekkaNinja"

declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}

export function userAuth(req:Request,res:Response,next:NextFunction){

    const header=req.headers['authorization']
    //console.log(header)

    const decoded =jwt.verify(header as string,Jwt_Screet)
    // console.log((decoded as JwtPayload).id)
    if(decoded){
        req.userId=(decoded as JwtPayload).id
       // console.log(req.userId)
        next()
    }else{
    res.json({
        msg:"authorization failed"
    })}

}