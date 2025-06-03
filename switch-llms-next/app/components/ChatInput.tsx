'use client'
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Send } from "lucide-react";
import { useEffect } from "react";

type FormData = {
  chatInput: string;
};

const ChatInput = ({ onSend }: { onSend: (message: string) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onSend(data.chatInput);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sticky w-2xl bg-background p-4 mb-2 m-auto flex items-center gap-2"
    >
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder="Type here..."
          {...register("chatInput", { required: "Type something..." })}
          className={`pr-10 ${errors.chatInput ? "border-destructive" : ""}`}
        />
        {errors.chatInput && (
          <p className="text-sm text-destructive mt-1">{errors.chatInput.message}</p>
        )}
      </div>
      <Button type="submit" size="icon" variant="default" className="shrink-0">
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
