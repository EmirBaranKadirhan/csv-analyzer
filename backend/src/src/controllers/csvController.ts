import { Request, Response } from "express"
import { parse } from "csv-parse/sync"
import fs from "fs"
import Analysis from "../models/Analysis"
import { analyzeWithAI } from "../services/groqService"


export const uploadCSV = async (req: Request, res: Response) => {

    try {

        if (req.file) {

            const fileContent = fs.readFileSync(req.file.path);
            const records = parse(fileContent, {
                columns: true,  // ilk satırı sütun ismi olarak al
                skip_empty_lines: true
            }) as Record<string, string>[]  // Key'leri string, value'ları string olan bir obje, anlamina gelir

            if (!records.length) {
                res.status(400).json({ message: "Dosya icinde eleman bulunamadi" })
            }
            const recordsLength = records.length
            const columns = Object.keys(records[0])

            const aiComment = await analyzeWithAI(recordsLength, columns)

            await Analysis.create({
                user: req.userId,
                fileName: req.file.originalname,   // kullanıcının yüklediği dosyanın gerçek ismi
                rowCount: recordsLength,
                columnName: columns,
                aiComment: aiComment
            })

            fs.unlinkSync(req.file.path)    // csv dosyasini isledikten sonra silmek icin

            return res.status(200).json({ recordsLength, columns, aiComment })

        } else {
            res.status(400).json({ message: "Hata" })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server hatası" })
    }

}


export const getHistory = async (req: Request, res: Response) => {

    try {
        if (req.userId) {
            const data = await Analysis.find({ user: req.userId })

            return res.status(200).json({ message: "Gecmis kayitlar basariyla getirildi", data })
        }
        return res.status(400).json({ message: "Giris yapilmadi" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server hatasi" })
    }

}