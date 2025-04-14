import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getalldataDB = async(query:any)=>{
    const andCondions:Prisma.AdminWhereInput[] = [];
    const adminSearchAbleFileds =['name', 'email']
    if(query){
        andCondions.push({
            OR:adminSearchAbleFileds.map(filed=>({
                
                    [filed]:{
                        contains:query,
                        mode:'insensitive'
                    }
    
        }))
        })
    }
    const whereConditions:Prisma.AdminWhereInput ={AND : andCondions}
    const result = await prisma.admin.findMany(
        {
            where:whereConditions
        }
    )
    return result
}
export const adminService={
    getalldataDB
}