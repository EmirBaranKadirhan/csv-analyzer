import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {   // req,res ve next'te tip atamasi yaptik

    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "Token bulunamadı" })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "Token bulunamadi" })
    }

    const jwtSecretKey = process.env.JWT_SECRET
    if (!jwtSecretKey) {
        throw new Error("JWT_SECRET tanımlı değil")
    }

    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
        next()
    }

}


export default authMiddleware