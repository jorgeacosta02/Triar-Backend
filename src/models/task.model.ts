import { model, Schema, Document, Types} from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    date: Date;
    userId: Schema.Types.ObjectId
}

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});


export default model<ITask>('Task', taskSchema);