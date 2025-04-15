import { NextFunction, Request, Response } from 'express';

import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constand';
import { AdminService } from './admin.service';
import { sendResponse } from '../../../shared/sendResponse';

import httpStatus from 'http-status';


const getAllFromDB = async (req: Request, res: Response, next:NextFunction) => {
    try {
        // console.log(req.query)
        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        console.log(options)
        const result = await AdminService.getAllFromDB(filters, options)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            meta:result.meta,
            message:"All data retrive",
            data:result
           })
    }
    catch (err:any) {
       next(err)
    }
}
const getByIdFromDB = async(req: Request, res: Response, next:NextFunction)=>{
    const {id}= req.params
    try {
        const result = await AdminService.getByIdFromDB(id)
        sendResponse(res,{
           statusCode:httpStatus.OK,
            success:true,
            message:"single data get",
            data:result
           })
    }
    catch (err:any) {
      next(err)
    }
}
const updateAdminFromDB = async(req: Request, res: Response, next:NextFunction)=>{
    const {id}= req.params
    try {
        const result = await AdminService.updateAdminFromDB(id, req.body)
        sendResponse(res,{
           statusCode:httpStatus.OK,
            success:true,
            message:"successfull update",
            data:result
           })
    }
    catch (err:any) {
      next(err)
    }
}
const deletedAdminFromDB = async(req: Request, res: Response, next:NextFunction)=>{
    const {id}= req.params
    try {
        const result = await AdminService.deletedAdminFromDB(id)
       sendResponse(res,{
        statusCode:httpStatus.OK, 
        success:true,
        message:"success full deleted",
        data:result
       })
    }
    catch (err:any) {
      next(err)
    }
}

export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateAdminFromDB,
    deletedAdminFromDB
}