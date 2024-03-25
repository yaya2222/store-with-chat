import { Schema, InferSchemaType, model, Document } from "mongoose";
import bcrypt from "bcrypt"

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    photo: string,
    storename: string
    introduction?: string,
    numProducts: number,
    bannerImage: string,
    role: "user" | "admin",
    passwordChangedAt?: Date,
    passwordResetToken?: string
    passswordResetExpires?: Date,
    active: boolean
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comparePassword:(password:string)=>boolean

}


const userSchema = new Schema<IUser>({
    name: { type: String, required: [true, "Fullname is required"] },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password should be greater then 6 character"],
        select: false
    },
    photo: {
        type: String,
        default: "https://res.cloudinary.com/queentech/image/upload/v1690010294/78695default-profile-picture1_dhkeeb.jpg"
    },
    storename: { type: String, required: [true, "StoreName is required"], unique: true, Lowercase: true },
    introduction: String,
    numProducts: { type: Number, default: 0 },
    bannerImage: {
        type: String,
        default:
            "https://plus.unsplash.com/premium_photo-1664302438823-41e4fe999f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passswordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
}, {
    timestamps: true,

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    const hashedPassword = bcrypt.hashSync(this.password, 12)
    this.password = hashedPassword
    next()
})

userSchema.methods.comparePassword= function(password:string){
    console.log(this);
    
return bcrypt.compareSync(password,this.password)

}

export default model<IUser>("User", userSchema)