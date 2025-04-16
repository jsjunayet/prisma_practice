import express from 'express';
import { authController } from './auth.controller';
const router = express.Router()
router.post('/', authController.loginUser)
export const authRoutes = router