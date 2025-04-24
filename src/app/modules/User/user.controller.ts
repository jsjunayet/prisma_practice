import { Request, Response } from "express";
import { userService } from "./user.service";

const userPost = async(req:Request, res:Response)=>{

   try{
    const result = await userService.createAdmin(req)
    res.status(200).send({
        success:true,
        message:"successfully created Admin",
        data:result
    })
   }catch(err:any){
    res.status(200).send({
        success:true,
        message: err.name ||"something went wrong!",
        error:err
    })
   }
}
export const userController= {
    userPost
}