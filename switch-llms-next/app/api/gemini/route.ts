// app/api/gemini/route.ts

export async function POST(req: Request) {
  const { message } = await req.json();

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return Response.json({ error: 'Gemini API key not found.' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log('Gemini API response:', data);
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini';

    return Response.json({ message: reply });
  } catch (error) {
    console.error('Gemini API error:', error);
    return Response.json({ error: 'Error calling Gemini API' }, { status: 500 });
  }
}
