export default async function handler(req, res) {

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { text } = req.body;

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "tts-1",
            voice: "alloy",
            input: text
        })
    });

    const audioBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");

    res.send(Buffer.from(audioBuffer));
}

