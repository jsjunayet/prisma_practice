import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { fileUploader } from "../../../helpars/FileUploader";


const router = Router()

router.post('/create-admin', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), fileUploader.upload.single('file'),
(req:Request, res:Response, next:NextFunction)=>{
    req.body = JSON.parse(req.body.data)
    next()
},
 userController.userPost)
 router.post('/create-doctor', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), fileUploader.upload.single('file'),
(req:Request, res:Response, next:NextFunction)=>{
    req.body = JSON.parse(req.body.data)
    next()
},
 userController.createDoctor)
export const userRoutes = router  