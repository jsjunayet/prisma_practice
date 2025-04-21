import express from 'express'
import { userRoutes } from '../modules/User/user.router'
import { adminRoutes } from '../modules/Admin/admin.route'
import { authRoutes } from '../modules/auth/auth.route'
const router = express.Router()
const moduleRoute = [
    {
        path:'/user',
        route:userRoutes
    },
    {
        path:'/admin',
        route:adminRoutes
    },
    {
        path:'/auth',
        route: authRoutes
    },
]
 moduleRoute.forEach(route=> router.use(route.path, route.route))
export default router