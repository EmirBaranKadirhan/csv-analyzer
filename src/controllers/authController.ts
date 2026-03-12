import { Request, Response } from "express"
import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


interface RegisterBody {
    email: string
    password: string
}


export const authRegister = async (
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

        const jwtSecretKey = process.env.JWT_SECRET

        if (!jwtSecretKey) {
            throw new Error("JWT_SECRET tanımlı değil")
        }

        const token = jwt.sign(
            { id: newUser._id },
            jwtSecretKey,
            { expiresIn: '1h' });

        res.status(201).json({ message: "Kayıt başarıyla tamamlandı.", token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server hatası"
        })

    }

}



interface LoginBody {
    email: string
    password: string
}



export const authLogin = async (
    req: Request<{}, {}, LoginBody>,
    res: Response
) => {

    try {

        const email = req.body.email
        const password = req.body.password

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(400).json({ message: "Kullanıcı bulunamadı" })
        }

        const match = await bcrypt.compare(password, existingUser.password);

        if (!match) {
            return res.status(400).json({ message: "Sifre yanlis" });
        }

        const jwtSecretKey = process.env.JWT_SECRET

        if (!jwtSecretKey) {
            throw new Error("JWT_SECRET tanımlı değil")
        }

        const token = jwt.sign(
            { id: existingUser._id },
            jwtSecretKey,
            { expiresIn: '1h' });


        return res.status(200).json({ message: "Giris basarili", token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server hatası" })

    }
}