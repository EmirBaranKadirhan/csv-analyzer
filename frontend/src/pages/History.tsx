import { useEffect, useState } from "react"
import { getHistory } from "../services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { intersection } from "zod"

export default function History() {

    const [history, setHistory] = useState<any[]>([])
    const [expanded, setExpanded] = useState<string | null>(null)
    const [error, setError] = useState<string>("")

    useEffect(() => {

        const fetchHistory = async () => {

            try {
                setError('')
                const response = await getHistory()
                console.log(response.data)
                setHistory(response.data.data)
            } catch (error) {
                console.log(error)
                setError(error instanceof Error ? error.message : 'Bir hata oluştu')
            }

        }
        fetchHistory()

    }, [])

    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4">
            {error && (
                <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</p>
            )}
            {history.map((item: any) => (
                <Card key={item._id}>
                    <CardHeader>

                        <CardTitle className="flex justify-between items-center">
                            <span>{item.fileName}</span>
                            <span className="text-sm text-muted-foreground font-normal">
                                {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Satır: {item.rowCount}</Badge>
                            {item.columnName.map((col: string) => (
                                <Badge key={col} variant="outline">{col}</Badge>
                            ))}
                        </div>
                        <p className="text-sm">
                            {expanded === item._id
                                ? item.aiComment
                                : item.aiComment.slice(0, 150) + '...'}
                        </p>
                        <Button variant="outline" onClick={() => setExpanded(expanded === item._id ? null : item._id)}
                            className="text-sm text-blue-500">
                            {expanded === item._id ? 'Daha az göster' : 'Devamını gör'}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

