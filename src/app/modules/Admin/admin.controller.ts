import { Request, Response } from 'express';

import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constand';
import { AdminService } from './admin.service';




const getAllFromDB = async (req: Request, res: Response) => {
    try {
        // console.log(req.query)
        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        console.log(options)
        const result = await AdminService.getAllFromDB(filters, options)
        res.status(200).json({
            success: true,
            message: "Admin data fetched!",
            meta:result.meta,
            data: result.data
        })
    }
    catch (err:any) {
        res.status(500).json({
            success: false,
            message: err?.name || "Something went wrong",
            error: err
        })
    }
}

export const AdminController = {
    getAllFromDB
}