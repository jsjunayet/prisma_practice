import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const update = async()=>{
const sigleUpdate = await prisma.post.update({
    where:{
        id:1
    },
    data:{

    }
})}
update()