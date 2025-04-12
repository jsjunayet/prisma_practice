import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
 const main = async()=>{
    const getAllFromDB = await prisma.post.findMany()
    const findFrist = await prisma.post.findFirstOrThrow({
        where:{
            published:false
        }
    })
    console.log({findFrist});
 }
 main();