'use client'
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import type { MessagePair } from "../page";
import { Card } from "../../components/ui/card";

interface ResponseSpaceProps {
  chatHistory: MessagePair[];
  isLoading?: boolean;
}

const ResponseSpace = ({ chatHistory, isLoading }: ResponseSpaceProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const getBubbleColor = (model: string) =>
    model === "groq" ? "bg-green-200" : "bg-blue-100";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="pr-6 my-2 overflow-y-auto max-h-[calc(100vh-30vh)] max-w-screen flex flex-col gap-2">
      {chatHistory.map((pair, index) => {
        const bubbleColor = getBubbleColor(pair.model);

        return (
          <div key={index} className="flex flex-col gap-1">
            {/* User Message */}
            <div className="self-end max-w-[70%]">
              <Card className="bg-gray-700 text-primary-foreground rounded-2xl rounded-tr-sm p-3 shadow-md">
                <p className="text-base">{pair.user}</p>
              </Card>
            </div>

            {/* Bot Response */}
            <div className="self-start max-w-[70%] break-words whitespace-pre-wrap">
              <Card className={`p-3 rounded-2xl rounded-tr-sm shadow-md ${bubbleColor}`}>
                <div className="text-base space-y-2 break-words overflow-wrap-anywhere">
                  {chatHistory.length - 1 === index && isLoading ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-4 w-4 border-2 border-t-2 border-t-muted-foreground rounded-full animate-spin" />
                      <span>Bot is typing...</span>
                    </div>
                  ) : (
                    <ReactMarkdown>{pair.bot}</ReactMarkdown>
                  )}
                </div>
              </Card>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default ResponseSpace;
