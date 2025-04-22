import express from 'express';
import { AuthController } from './auth.controller';
import { auth } from '../../middleware/auth';
import { UserRole } from '@prisma/client';


const router = express.Router();

router.post(
    '/login',
    AuthController.loginUser
);

router.post(
    '/refresh-token',
    AuthController.refreshToken)

    router.post("/changePassword",
         auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
          AuthController.changePassword)
          
          router.post("/forgetPassword",
             AuthController.forgetPassword)

             router.post("/resetPassword",
                auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
                AuthController.resetPassword)


export const authRoutes = router