import mongoose, { Schema, model } from "mongoose";
import { User } from "./user.model.js";

const linkSchema = new Schema ({
    token: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: true
    }
})

export const Link = model("Link", linkSchema)