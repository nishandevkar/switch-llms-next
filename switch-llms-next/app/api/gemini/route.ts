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
              parts: [{ text: `You are an excellent grammar and english coach husband teaching your wife grammar. 
                You are to show any mistakes and give the correct sentences of all the sentences that are written to you.
                Give a gujarati translation. 
                Make it conversational and do not be dismissive at all, keep a positive tone and give a sweet positive encouraging note at the end as if given to your significant other whose name is Nenc.
                These are my sentences: ${message}` }],
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
