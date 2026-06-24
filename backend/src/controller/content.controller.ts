import type { Request, Response } from "express";
import z from 'zod'
import { Content } from "../model/content.model.js";

const contentSchema = z.object({
    type: z.enum(["document", "youtube", "twitter"]),
    title: z.string().min(3),
    link: z.string(),
    tags: z.array(z.string()).default([])
})

type contentType = z.infer<typeof contentSchema>

export const addContent = async (req: Request, res: Response) => {
    try {
        const result = contentSchema.safeParse(req.body)
        if(!result.success) {
            return res.status(411).json({
                msg: result.error.issues[0]?.message
            })
        }

        const updatedBody: contentType = result.data
        const content = await Content.create({
            type: updatedBody.type,
            title: updatedBody.title,
            link: updatedBody.link,
            tags: updatedBody.tags,
            userId: req.userId
        })

        res.status(200).json({
            msg: "Content added successfully!",
        })
    } catch (error) {
        console.log(`Error in addContent controller: ${error}`)
    }
}

export const getContent = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const content = await Content.find({
            userId
        }).populate("userId", "-password")

        if(!content) {
            return res.status(403).json({
                msg: "Error while fetching contents!"
            })
        }

        res.status(200).json({
            content
        })
    } catch (error) {
        console.log(`Error in getContent controller: ${error}`)
    }
}

export const deleteContent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = req.userId
        const deleteContent = await Content.deleteOne({
            _id: id,
            userId
        })

        if(deleteContent.deletedCount === 0) {
            return res.status(403).json({
                msg: "You are trying to delete another user's content"
            })
        }

        res.status(200).json({
            msg: "Content deleted successfully!"
        })
    } catch (error) {
        console.log(`Error in deleteContent controller: ${error}`)
    }
}