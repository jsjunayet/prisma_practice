import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { Router } from "express";
import { upload } from "../../../helpars/FileUploader";


const router = Router()

router.post('/', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), upload.single('file'), userController.userPost)
export const userRoutes = router  