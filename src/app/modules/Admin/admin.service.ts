import { Admin, Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";
import prisma from "../../../shared/prisma";
import { adminSearchAbleFields } from "./admin.constand";


const getAllFromDB = async (params: any, options: any) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;
    const andCondions: Prisma.AdminWhereInput[] = [];

    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR: adminSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        })
    }

    //console.dir(andCondions, { depth: 'inifinity' })
    const whereConditons: Prisma.AdminWhereInput = { AND: andCondions }

    const result = await prisma.admin.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });
    const total = await prisma.admin.count({
        where:whereConditons
    })
    return {
        meta:{ 
            page,
            limit,
            total
        },
        data:result
    };
}

const getByIdFromDB = async (id:string):Promise<Admin | null>=>{
    const result = await prisma.admin.findUnique({
        where:{
            id
        }
    })
return result
}
const updateAdminFromDB = async (id:string, data:Partial<Admin>):Promise<Admin | null>=>{
    console.log(id, data);
   await prisma.admin.findUniqueOrThrow({
        where:{
            id
        }
    })
    const result = await prisma.admin.update({
        where:{
            id
        },
        data
    })
return result
}
const deletedAdminFromDB = async (id:string):Promise<Admin | null>=>{

   await prisma.admin.findUniqueOrThrow({
        where:{
            id
        }
    })
    const result = await prisma.$transaction(async(tx)=>{
        const adminDeleted = await tx.admin.delete({
            where:{
                id
            }
        })
        const userDeleted = await tx.user.delete({
            where:{
                email:adminDeleted.email
            }
        })
        return adminDeleted
    })
return result
}


export const AdminService = {
    getAllFromDB,
    getByIdFromDB,
    updateAdminFromDB,
    deletedAdminFromDB,
}