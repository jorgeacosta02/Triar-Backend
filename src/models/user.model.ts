import { model, Schema } from "mongoose";
import { IUserData } from "../Interfaces/userInterfaces";


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    dni: {
        type: Number,
        unique: true,
        required: true,
        trim: true
    },
    healthPlan: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: Number,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true 
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: ''
    }
});

export default model<IUserData>('User', userSchema);