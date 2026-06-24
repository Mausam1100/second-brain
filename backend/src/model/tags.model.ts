import mongoose, { Schema, model } from "mongoose";
import { User } from "./user.model.js";

const tagsSchema = new Schema ({
    tags: {
        type: String,
        unique: true, 
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: User
    }
})

export const Tags = model("Tags", tagsSchema)