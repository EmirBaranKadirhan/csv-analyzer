import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BrainCircuit } from 'lucide-react';
import { useState } from "react";
import { uploadCSV } from "../services/api"

export default function Dashboard() {

    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleUpload = async () => {
        if (!file) return
        const result = await uploadCSV(file)
        console.log(result)
        setResult(result)
    }

    return (
        <div>
            <Field>
                <FieldLabel htmlFor="picture">Folder</FieldLabel>
                <Input id="picture" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />  {/* hata vermemesi icin ?. ve ?? kullandik */}
                <FieldDescription>Select a picture to upload.</FieldDescription>
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleUpload}>
                    <BrainCircuit size={28} />
                    Start Analysis
                </Button>

            </Field>
        </div>
    )
}
