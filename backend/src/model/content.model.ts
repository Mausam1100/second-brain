import mongoose, { model, Schema } from "mongoose";
import { User } from "./user.model.js";
import { Tags } from "./tags.model.js";

const contentSchema = new Schema ({
    type: {
        type: String,
        enum: ["document", "youtube", "twitter"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: User
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: Tags
    }]
})

export const Content = model("Content", contentSchema)