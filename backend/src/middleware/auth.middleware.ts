import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']
        if(!token) {
            return res.status(400).json({
                msg: "JWT is not included!"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY as string) as {id: string}
        if(!decoded) {
            return res.status(400).json({
                msg: "Invalid jwt token!"
            })
        }
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log(`Error in authMiddleware: ${error}`)
    }
}