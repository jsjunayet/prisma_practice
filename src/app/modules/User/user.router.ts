import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { Router } from "express";


const router = Router()

router.post('/', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), userController.userPost)
export const userRoutes = router  