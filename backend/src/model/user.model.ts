import { Document, model, Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

interface IUser extends Document {
    username: string,
    password: string,

    isPasswordCorrect(password: string): Promise<boolean>
    generateJWT(): string
}

const userSchema = new Schema <IUser> ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre("save", async function() {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 16);
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateJWT = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.JWT_KEY as string
    )
}

export const User = model("User", userSchema)