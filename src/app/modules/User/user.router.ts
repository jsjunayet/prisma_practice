import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { Router } from "express";
import { fileUploader } from "../../../helpars/FileUploader";


const router = Router()

router.post('/', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), fileUploader.upload.single('file'), userController.userPost)
export const userRoutes = router  