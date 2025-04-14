import { Request, Response } from "express";
import { userService } from "./user.service";

const userPost = async(req:Request, res:Response)=>{
    const body = req.body
    console.log(body);
    const result = await userService.createAdmin(body)
    res.send(result)
}
export const userController= {
    userPost
}