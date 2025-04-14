import { Request, Response } from "express"
import { adminService } from "./admin.service"

const getalldataDB = async(req:Request, res:Response)=>{
    try{
        const query = req.query.searchTerm
        console.log(query);
     const result = await adminService.getalldataDB(query)
     res.status(200).send({
         success:true,
         message:"successfully all data retreive",
         data:result
     })
    }catch(err:any){
     res.status(200).send({
         success:true,
         message: err.name ||"something went wrong!",
         error:err
     })
    }
 }
 export const adminController= {
     getalldataDB
 }