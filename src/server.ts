import express from 'express'
import dotenv from "dotenv";
import { connectDB } from "./config/db"

dotenv.config()
const app = express();
app.use(express.json());
connectDB();


app.get('/', (req, res) => {
    res.send('GET request to the homepage');
});



// .env'den her sey string olarak gelir !!
app.listen(Number(process.env.PORT), () => {
    console.log(`Example app listening at http://localhost:${Number(process.env.PORT)}`);
});

