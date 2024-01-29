import { model, Schema, Document} from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    dni: number;
    healthPlan?: string;
    phone: number;
    email: string;
    password: string;
    status: boolean;
    role: string;
}

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
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: ''
    }
});

export default model<IUser>('User', userSchema);