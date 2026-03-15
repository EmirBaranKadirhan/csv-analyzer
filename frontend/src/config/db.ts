import mongoose from 'mongoose';

export const connectDB = async () => {

    try {

        const mongoUri = process.env.MONGO_URI
        if (!mongoUri) {                                    // if blogu sayesinde typescript MONGO_URI kesin olarak string oldugunu bilebiliyor !
            throw new Error("MONGO_URI tanımlı değil")
        }
        await mongoose.connect(mongoUri)
        console.log("MongoDB bağlantısı başarılı")

    } catch (error) {

        console.log("DB baglanti basarisiz")
        process.exit(1)
    }

}




