import { Request, Response, Router } from "express";

const router = Router()
router.get('/', (req:Request, res:Response)=>{
    res.send({
        message:"this is health care"
    })
})
export const userRoutes = router  