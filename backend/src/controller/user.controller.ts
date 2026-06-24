import type { Request, Response } from "express";
import z from "zod"
import { User } from "../model/user.model.js";

const signUpSchema = z.object({
    username: z.string().min(3).max(11),
    password: z.string().min(8).max(20)
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
})

const signInSchema = z.object({
    username: z.string(),
    password: z.string()
})

type signUpType = z.infer<typeof signUpSchema>
type signInType = z.infer<typeof signInSchema>

export const signUp = async (req: Request, res: Response) => {
    try {
        const result = signUpSchema.safeParse(req.body)
        if(!result.success) {
            return res.status(411).json({
                msg: result.error.issues[0]?.message
            })
        }

        const {username, password}: signUpType = result.data

        const existed = await User.findOne({username})
        if(existed) {
            return res.status(403).json({
                msg: "User with this username already existed!"
            })
        }

        const user = await User.create({
            username,
            password
        })
        res.json({
            msg: "User sign up successfully!"
        })
    } catch (error) {
        console.log(`Error in signUp controller: ${error}`)
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const result = signInSchema.safeParse(req.body)
        if(!result.success) {
            return res.status(411).json({
                msg: result.error.issues[0]?.message
            })
        }
        const {username, password}: signUpType = result.data

        const user = await User.findOne({username})
        if(!user) {
            return res.status(403).json({
                msg: "User with this username doesn't exist!"
            })
        }

        const isPassowrdCorrect = await user.isPasswordCorrect(password)
        if(!isPassowrdCorrect) {
            return res.status(403).json({
                msg: "Incorrect password!"
            })
        }
        const jwt = user.generateJWT()
        res.status(200).json({
            msg: "User logged in successfully",
            jwt
        })
    } catch (error) {
        console.log(`Error in signIn controller: ${error}`)
    }
}

export const logOut = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            msg: "User logout successfully!"
        })
    } catch (error) {
        console.log(`Error in logOut controller: ${error}`)
    }
}