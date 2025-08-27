"use client";
import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ResponseSpace from "./components/ResponseSpace";
// import { Poppins, Nunito } from 'next/font/google';
// import { Label } from "../components/ui/label";


// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "../components/ui/select";
import { Card } from "../components/ui/card";

export type MessagePair = {
  user: string;
  bot: string;
  model: string;
};

const ChatPage = () => {
  const [chatHistory, setChatHistory] = useState<MessagePair[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [llmModel] = useState("gemini");

  const handleSendMessage = async (msg: string) => {
  setIsLoading(true);
  setChatHistory((prev) => [...prev, { user: msg, bot: "", model: llmModel }]);

  try {
    let responseText = "";

    if (llmModel === "groq") {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      responseText = data.message || "No response from Groq";
    } else if (llmModel === "gemini") {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      responseText = data.message || "No response from Gemini";
    } else {
      responseText = "Invalid model selected";
    }

    setChatHistory((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        user: msg,
        bot: responseText,
        model: llmModel,
      };
      return updated;
    });
  } catch (error) {
    console.error("Error fetching response:", error);
    setChatHistory((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        user: msg,
        bot: "Error occurred",
        model: llmModel,
      };
      return updated;
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <>
      {/* <Card className="w-2xl p-4 my-4 mx-auto">
        <div className="space-y-2">
          <Label htmlFor="select-model">Select Model</Label>
          <Select value={llmModel} onValueChange={setLLMModel}>
            <SelectTrigger id="select-model" className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="groq">LLaMa (Groq)</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card> */}
      <div className="flex items-center justify-center">
  <h1 className={"text-4xl md:text-6xl font-bold text-center p-4"}>❤️ Nishan &apos;s Grammar classes for Nenc 👩🏻‍🏫</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {chatHistory.length > 0 && (
          <Card className="w-screen p-4 my-2 mx-auto overflow-y-auto">
            <ResponseSpace chatHistory={chatHistory} isLoading={isLoading} />
          </Card>
        )}

      </div>
      <ChatInput onSend={handleSendMessage} />
    </>
  );
};

export default ChatPage;


