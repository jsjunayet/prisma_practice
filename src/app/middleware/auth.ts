import { NextFunction, Request, Response } from "express"
import { jwtHelpers } from "../../helpars/jwtHelpers"
import config from "../../config"
import { Secret } from "jsonwebtoken"
import ApiError from "../Errors/AppError"
import httpStatus from 'http-status'

export const auth =(...roles:string[])=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        try{
            const token = req.headers.authorization
            if(!token){
                throw new ApiError(httpStatus.UNAUTHORIZED,"You are not authorized")
            }
            const verifiedToken = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret)
            console.log(verifiedToken);
            if(roles.length && !roles.includes(verifiedToken.role)){
                throw new ApiError(httpStatus.FORBIDDEN,"You are not authorized")
            }
            next()

        }catch(err){
            next(err)
        }
    }

}