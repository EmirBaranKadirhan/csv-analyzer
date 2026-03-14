import Groq from "groq-sdk"

export const analyzeWithAI = async (rowCount: number, columns: string[]) => {

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const chatCompletion = await groq.chat.completions.create({
        messages: [{
            role: "user",
            content: `You are an expert data analyst. Analyze the following CSV file summary and provide insights in Turkish.
            CSV Details:
            - Total rows: ${rowCount}
            - Columns: ${columns.join(", ")}

            Please provide:
            1. What type of data this might be
            2. Potential use cases for this dataset
            3. Any observations about the structure

            Keep the response concise and practical.`}],

        model: "llama-3.3-70b-versatile"
    })

    const text = chatCompletion.choices[0]?.message?.content || ""
    console.log(text)
    return text
}

