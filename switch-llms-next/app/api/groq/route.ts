
export async function POST(req: Request) {
  const { message } = await req.json();
  console.log("Received message:", message);
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  return Response.json({ message: data.choices?.[0]?.message?.content });
}