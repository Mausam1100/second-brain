import type { Request, Response } from "express";
import crypto from 'crypto'
import { Link } from "../model/link.model.js";
import { Content } from "../model/content.model.js";
import { User } from "../model/user.model.js";

export const generateLinkToken = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        const share = req.body.share
        if(share) {
            const existingLink = await Link.findOne({userId})
            if(existingLink) {
                return res.status(403).json({
                    msg: "Link already existed from this user!"
                })
            }

            const token = crypto.randomBytes(5).toString("hex")
            await Link.create({
                token,
                userId
            })
            res.status(200).json({
                token
            })
        } else {
            await Link.deleteOne({userId})
            res.status(200).json({
                msg: "Link removed!"
            })
        }
    } catch (error) {
        console.log(`Error in generateLinkBash controller: ${error}`)
    }
}

export const linkData = async (req: Request, res: Response) => {
    try {
        const token = req.params.token
        if(typeof token !== "string") {
            return res.status(403).json({
                msg: "link id should be string!"
            })
        }

        const link = await Link.findOne({token})
        if(!link) {
            return res.status(403).json({
                msg: "No data found with this link!"
            })
        }

        const content = await Content.find({userId: link.userId!})
        const user = await User.findOne({_id: link.userId!})

        res.status(200).json({
            username: user?.username,
            content
        })

    } catch (error) {
        console.log(`Error in generateLinkBash controller: ${error}`)
    }
}