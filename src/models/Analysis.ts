import mongoose from "mongoose"
const { Schema, model } = mongoose;


interface IAnalysis {

    user: mongoose.Types.ObjectId
    fileName: string
    rowCount: number
    columnName: string[]        // birden fazla sutun olacak
    aiComment: string
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
    rowCount: {
        type: Number,
        required: true
    },
    columnName: {
        type: [String]
    },
    aiComment: {
        type: String
    }

}, { timestamps: true })


const Analysis = model<IAnalysis>('Analysis', analysisSchema);
export default Analysis;