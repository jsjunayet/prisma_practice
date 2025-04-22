import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token genereated successfully!",
        data: result
        // data: {
        //     accessToken: result.accessToken,
        //     needPasswordChange: result.needPasswordChange
        // }
    })
});
const changePassword = catchAsync(async(req: Request & {user?:any}, res: Response) => {
    const user = req.user
    // console.log(req.query)
    const result = await AuthServices.changePassword(user, req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Password Change Successfully",
        data:result
       })
  
  })
  const forgetPassword = catchAsync(async(req: Request & {user?:any}, res: Response) => {
    const email = req.body.email
    const result = await AuthServices.forgetPassword(email)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Forget password  Successfully",
        data:result
       })
  
  })
  
export const AuthController ={
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword

}
