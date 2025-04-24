import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import { fileUploader } from "../../../helpars/FileUploader";

const prisma = new PrismaClient();

const createAdmin = async (req: any) => {
    const data = req.body
    const file = req.file
    if(file){
        const uploadImage = await fileUploader.uploadImage(file)
       data.admin.profilePhoto = uploadImage?.secure_url
    }

    const hashedPassword: string = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.adminemail,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: data.admin
        });

        return createdAdminData;
    });

    return result;
};
const createDoctor = async (req: any) => {
    const data = req.body
    const file = req.file
    if(file){
        const uploadImage = await fileUploader.uploadImage(file)
       data.doctor.profilePhoto = uploadImage?.secure_url
    }

    const hashedPassword: string = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }

    const result = await prisma.$transaction(async (transactionClient) => {
    const userDates =    await transactionClient.user.create({
            data: userData
        });
        console.log(data.doctor);
        const createdDoctorData = await transactionClient.doctor.create({
            data: data.doctor
        });
console.log(createdDoctorData);
        return createdDoctorData;
    });

    return result;
};


export const userService = {
    createAdmin,
    createDoctor
}