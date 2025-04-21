import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";


const router = Router()
const auth =(...roles:string[])=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        try{
            const token = req.headers.authorization
            if(!token){
                throw new Error("You are not authorized")
            }
            const verifiedToken = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret)
            console.log(verifiedToken);
            if(roles.length && !roles.includes(verifiedToken.role)){
                throw new Error("You are not authorized")
            }
            next()

        }catch(err){
            next(err)
        }
    }

}
router.post('/', auth('ADMIN', 'USER'), userController.userPost)
export const userRoutes = router  