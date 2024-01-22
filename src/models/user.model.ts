import { model, Schema, Document} from "mongoose";

export interface IUser extends Document {
    // username: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    // usrname: {
    //     type: String,
    //     required: true,
    //     lowercase: true,
    //     trim: true
    // },
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
    }
});

export default model<IUser>('User', userSchema);