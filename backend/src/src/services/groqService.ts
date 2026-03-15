import Groq from "groq-sdk"

export const analyzeWithAI = async (rowCount: number, columns: string[]) => {

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const chatCompletion = await groq.chat.completions.create({
        messages: [{
            role: "user",
            content: `You are an expert data analyst. Respond ONLY in Turkish. Do not use any other language.

                Analyze the following CSV file summary:
                - Total rows: ${rowCount}
                - Columns: ${columns.join(", ")}

                Provide a brief analysis in Turkish:
                1. What type of data this might be
                2. Potential use cases
                3. Observations about the structure`}],

        model: "llama-3.1-8b-instant"
    })

    const text = chatCompletion.choices[0]?.message?.content || ""
    console.log(text)
    return text
}

