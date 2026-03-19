import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit } from 'lucide-react';
import { useState } from "react";
import { uploadCSV } from "../services/api"

export default function Dashboard() {

    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string>("")

    const handleUpload = async () => {

        try {
            setError("")        // try icinde basa koyduk cunku yeni istek başladığında önceki hatayı temizlemeli !
            if (!file) return
            setLoading(true)
            const result = await uploadCSV(file)
            console.log(result)
            setResult(result.data)
        } catch (error) {
            console.log(error)
            setError(error instanceof Error ? error.message : "Bir hata oluştu")    // error instanceof Error ==> gelen hata bir Error nesnesi mi kontrol eder
        } finally {
            setLoading(false)

        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>CSV Analysis</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel htmlFor="picture">CSV File</FieldLabel>
                        <Input
                            id="picture"
                            type="file"
                            accept=".csv"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        />
                        <FieldDescription>Select a CSV file to analyze.</FieldDescription>
                    </Field>
                    <Button
                        className="bg-blue-500 hover:bg-blue-600 w-full"
                        onClick={handleUpload}
                        disabled={loading || !file}
                    >
                        {loading ? 'Analyzing...' : (
                            <>
                                <BrainCircuit size={18} className="mr-2" />
                                Start Analysis
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {error && (
                <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</p>
            )}

            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle>Analysis Result</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Rows: {result.recordsLength}</Badge>
                            {result.columns?.map((col: string) => (
                                <Badge key={col} variant="outline">{col}</Badge>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{result.aiComment}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}