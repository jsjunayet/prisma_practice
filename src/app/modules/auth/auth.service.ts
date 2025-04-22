
import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt'

import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import { Admin, User, UserStauts } from "@prisma/client";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import config from "../../../config";
import ApiError from "../../Errors/AppError";
import { sendMail } from "../../../shared/SendMail";

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStauts.ACTIVE
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.refresh_token_secret as Secret,
        config.jwt.refresh_token_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    };
};

const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(token, config.jwt.refresh_token_secret as Secret);
    }
    catch (err) {
        throw new Error("You are not authorized!")
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStauts.ACTIVE
        }
    });

    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    };

};
const changePassword =async(user:any, body:any)=>{
const userData = await prisma.user.findUniqueOrThrow({
    where:{
        email:user.email,
        status:UserStauts.ACTIVE
    }
}) 
const isCorrectPassword:boolean = await bcrypt.compare(body.oldPassword, userData.password)
if(!isCorrectPassword){
    throw new ApiError(httpStatus.UNAUTHORIZED,"Password Incorrect")
}
const hashedPassword:string = await bcrypt.hash(body.newPassword, 12)
await prisma.user.update({
    where:{
        email:userData.email
    },
    data:{
        password:hashedPassword,
        needPasswordChange:false
    }
})
return {
    message: "password Change Successfully"
}
}


const forgetPassword = async (email:string) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: email,
            status: UserStauts.ACTIVE
        }
    });

    const resPasswordToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );
    const resetPaswordLink = `http://localhost:5000?email=${userData.email}&token=${resPasswordToken}`
    sendMail(userData.email, 
        `
        <div>
        <p>Dear user<p>
        <p> Your password reset link 
        <a href=${resetPaswordLink}>
        <button>Reset Password</button>
        </a>
        </div>
        `)


};
const resetPassword=async(token:string, payload:{email:string, password:string})=>{
    console.log(payload);
const userData = await prisma.user.findUniqueOrThrow({
    where:{
        email:payload.email,
        status:UserStauts.ACTIVE
    }
})
const isValided = jwtHelpers.verifyToken(token,config.jwt.jwt_secret as Secret)
if(!isValided){
    throw new ApiError(httpStatus.FORBIDDEN, "forbidden Password")
}

}
export const AuthServices ={
    refreshToken,
    loginUser,
    changePassword,
    forgetPassword,
    resetPassword

}