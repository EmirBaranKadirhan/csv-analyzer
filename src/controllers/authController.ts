import { Request, Response } from "express"
import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface RegisterBody {
    email: string
    password: string
}


const authRegister = async (
    req: Request<{}, {}, RegisterBody>,
    res: Response

) => {

    try {

        const email = req.body.email
        const password = req.body.password

        const existingUser = await User.findOne({ email })

        if (existingUser) {

            return res.status(400).json({ message: "Bu kullanıcı zaten mevcut!" });
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        res.status(201).json({ message: "Kayıt başarıyla tamamlandı." });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server hatası"
        })

    }


}