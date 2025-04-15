import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/User/user.router'
import { adminRoutes } from './app/modules/Admin/admin.route'
import router from './app/route'
const app:Application = express()
app.use(cors())
app.use(express.json())
app.get('/', (req:Request, res:Response)=>{
    res.send({
        message:'Ph health care server...'
    })
})
app.use('/api/v1', router)
export default app
