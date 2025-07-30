import { Request, Response } from "express";
import authModel from "../model/authModel";
import crypto from "crypto"
import bcrypt from "bcrypt"
import dotenv from "dotenv"



dotenv.config()

export const register = async (req:any, res: Response) => {
    try {
        const { name, email, password } = req.body

        const initial = name.charAt(0).toUpperCase()
       
        const code = crypto.randomInt(1000, 9999).toString();
      
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await authModel.create({
            name,
            email,
            password: hash,
            image : initial ,
            verified: false,
            code
        })

       
        res.status(201).json({
            message: `welcome ${user?.name}, you have sucessfully created an account`,
            Data: user,
        })
    } catch (error) {
        res.status(404).json({
            message: "error registering user",
            data: error
        })
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await authModel.findOne({ email })

        if (user) {
            const checked = await bcrypt.compare(password, user?.password)

            if (checked) {
                res.status(200).json({
                    message: `Welcome ${user?.name}`,
                })
            } else {
                res.status(404).json({
                    message: "Password Incorrect",
                })
            }
        } else {
            res.status(404).json({
                message: "User Not Found",
            })
        }
    } catch (error) {
        res.status(404).json({
            message: "Error logging user",
            data: error
        })
    }
}





