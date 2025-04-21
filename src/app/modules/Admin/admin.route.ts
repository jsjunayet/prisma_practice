import { Router } from "express";
import { AdminController } from "./admin.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "@prisma/client";


const router = Router()
router.get("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.getAllFromDB)
router.get("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.getByIdFromDB)
router.patch("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.updateAdminFromDB)
router.delete("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.deletedAdminFromDB)



export const adminRoutes = router