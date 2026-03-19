import express from 'express'
import dotenv from "dotenv";
import cors from 'cors'
import { connectDB } from "./config/db"
import authRoutes from "./routes/authRoutes"
import csvRoutes from "./routes/csvRoutes"

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/csv', csvRoutes);

// .env'den her sey string olarak gelir !!
app.listen(Number(process.env.PORT), () => {
    console.log(`Example app listening at http://localhost:${Number(process.env.PORT)}`);
});

