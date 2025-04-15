import { Router } from "express";
import { AdminController } from "./admin.controller";


const router = Router()
router.get("/",AdminController.getAllFromDB)
router.get("/:id",AdminController.getByIdFromDB)
router.patch("/:id",AdminController.updateAdminFromDB)
router.delete("/:id",AdminController.deletedAdminFromDB)



export const adminRoutes = router