import { Request, Response } from "express"
import { parse } from "csv-parse/sync"
import fs from "fs"
import Analysis from "../models/Analysis"


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

            await Analysis.create({
                user: req.userId,
                fileName: req.file.originalname,   // kullanıcının yüklediği dosyanın gerçek ismi
                lineCount: recordsLength,
                columnName: columns
            })

            return res.status(200).json({ recordsLength, columns })

        } else {
            res.status(400).json({ message: "Hata" })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server hatası" })
    }

}