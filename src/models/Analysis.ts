import mongoose from "mongoose"
const { Schema, model } = mongoose;


interface IAnalysis {

    user: mongoose.Types.ObjectId
    fileName: string
    lineCount: number
    columnName: string[]        // birden fazla sutun olacak
    createdAt?: Date
    updatedAt?: Date

}


const analysisSchema = new Schema<IAnalysis>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fileName: {
        type: String,
        required: true
    },
    lineCount: {
        type: Number,
        required: true
    },
    columnName: {
        type: [String]
    }

}, { timestamps: true })


const Analysis = model<IUser>('Analysis', analysisSchema);
export default Analysis;