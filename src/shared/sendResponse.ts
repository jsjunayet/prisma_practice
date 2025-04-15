import { Response } from "express"

export const sendResponse = <T> (res:Response, josnData:{
    statusCode:number,
    success:boolean,
    message:string,
    meta?:{
        page:number,
        limit:number,
        total:number
    }
    data: T | null | undefined
})=>{
    res.status(josnData.statusCode).json({
        success: josnData.success,
        message: josnData.message,
        meta: josnData.meta || null || undefined,
        data:josnData.data || null || undefined
    })
}