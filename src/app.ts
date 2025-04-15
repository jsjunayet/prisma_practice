import express, { Application,  NextFunction,  Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/User/user.router'
import { adminRoutes } from './app/modules/Admin/admin.route'
import router from './app/route'
import httpStatus from 'http-status';
import GlobalErrorHandle from './app/middleware/globalErrorHandler'
const app:Application = express()
app.use(cors())
app.use(express.json())
app.get('/', (req:Request, res:Response)=>{
    res.send({
        message:'Ph health care server...'
    })
})
app.use('/api/v1', router)

app.use(GlobalErrorHandle)
app.use((req:Request, res:Response, next:NextFunction)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:"Not Fount Route",
        error:{
            path:req.originalUrl,
            message:"YOU Requested Path Not Found!!!"
        }
    })
})

export default app
