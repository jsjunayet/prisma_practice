import { Router } from "express";
import { adminController } from "./Admin.controller";

const router = Router()
router.get("/",adminController.getalldataDB)
export const adminRoutes = router