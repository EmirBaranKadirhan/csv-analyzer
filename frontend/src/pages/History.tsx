import { useEffect, useState } from "react"
import { getHistory } from "../services/api"

export default function History() {

    const [history, setHistory] = useState<any[]>([])

    useEffect(() => {

        const fetchHistory = async () => {

            const response = await getHistory()
            console.log(response.data)
            setHistory(response.data.data)
        }
        fetchHistory()

    }, [])

    return (
        <div>
            {history.map((item: any) => (
                <div key={item._id}>
                    <p>{item.fileName}</p>
                    <p>Satır sayısı: {item.rowCount}</p>
                    <p>Sütunlar: {item.columnName.join(', ')}</p>
                    <p>{item.aiComment}</p>
                </div>
            ))}
        </div>
    )
}

