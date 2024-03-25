import { RequestHandler } from "express";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken"

interface RegisterBody {
    email?: string,
    name?: string,
    password?: string,
    storename?: string
}

export const register: RequestHandler<unknown, unknown, RegisterBody, unknown> = async (req, res) => {
    const { name, email, password, storename } = req.body

    try {

        if (!name || !email || !password || !storename) throw new Error('Missing data')

        const user = await userModel.create({ name, email, password, storename })
        res.status(200).send({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error
        })
    }
}


interface LoginBody {
    email?: string,
    password?: string
}
export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) throw new Error('Missing data')

        const dbUser = await userModel.findOne({ email }).select("+password")

        if (!dbUser) {
            res.status(404).send({
                success: false,
                message: "We don't have a user with that email"
            })
        } else {
            const comparePassword = await dbUser.comparePassword(password)
            if (comparePassword) {
                const token = jwt.sign(
                    { id: dbUser._id }, 
                    process.env.JWT_SECRET as string, 
                    {expiresIn: process.env.JWT_SECRET_EXP as string}
                )
                res.status(200).json({
                    success:true,
                    token
                })
            }else{
                res.status(400).json({
                    success:false,
                    message:"Password or email is incorrect"
                })
            }
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Somthing when wrong"

        })
    }
}
