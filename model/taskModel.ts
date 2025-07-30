import mongoose, { Schema } from "mongoose"

interface task {
    title: string,
    description: string
    isDone: boolean,
    userID: string
}

interface taskData extends task, mongoose.Document { }

const taskModel = new Schema({
    title: {
        type: String,
        required: true,


    },
    description: {
        type: String,
      

    },
    isDone: {
        type: Boolean ,
        default:false

    },
    userID: {
        type: String

    },
}, { timestamps: true });
export default mongoose.model<taskData>("tasks",taskModel)