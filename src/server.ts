import express from 'express'
import dotenv from "dotenv";
import { connectDB } from "./config/db"
import authRoutes from "./routes/authRoutes"

dotenv.config()
const app = express();
app.use(express.json());
connectDB();


app.use('/api/auth', authRoutes);


// .env'den her sey string olarak gelir !!
app.listen(Number(process.env.PORT), () => {
    console.log(`Example app listening at http://localhost:${Number(process.env.PORT)}`);
});

