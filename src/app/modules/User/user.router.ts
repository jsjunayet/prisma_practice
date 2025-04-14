import { Request, Response, Router } from "express";
import { userController } from "./user.controller";

const router = Router()
router.post('/', userController.userPost)
export const userRoutes = router  