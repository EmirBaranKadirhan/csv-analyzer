// Bu dosya TypeScript'e şunu söylüyor: "Express'in Request tipine userId alanı ekle."

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

export { }