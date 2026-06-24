import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import contentRouter from './routes/content.routes.js'
import shareRouter from './routes/share.routes.js'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cors())

app.use('/api/v1/user/', userRouter)
app.use('/api/v1/content/', contentRouter)
app.use('/api/v1/brain/', shareRouter)

export default app