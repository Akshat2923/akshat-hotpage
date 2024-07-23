import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { Bot, SendHorizontal, Trash, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>;
}

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <DrawerContent className="flex h-[70vh] flex-col max-w-2xl mx-auto w-full">
      <DrawerHeader>
        <DrawerTitle>AI Chat</DrawerTitle>
        <DrawerDescription>
          Ask me anything about the website!
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id} />
        ))}
        {isLoading && lastMessageIsUser && (
          <ChatMessage
            message={{
              id: "loading",
              role: "assistant",
              content: "Thinking...",
            }}
          />
        )}
        {error && (
          <ChatMessage
            message={{
              id: "error",
              role: "assistant",
              content: "Something went wrong. Please try again!",
            }}
          />
        )}
        {!error && messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <Bot size={28} />
            <p className="text-lg font-medium">
              Send a message to start the AI chat!
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by the new gpt-4o-mini model from OpenAI.
            </p>
          </div>
        )}
      </div>
      <DrawerFooter>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setMessages([])}
          >
            <Trash className="h-4 w-4" />
          </Button>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            className="flex-1 rounded-md border bg-background px-3 py-2"
            ref={inputRef}
          />
          <Button type="submit" disabled={input.length === 0}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && <Bot className="mr-2 flex-none" />}
      <div
        className={cn(
          "rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-foreground text-background",
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
                className="text-primary hover:underline"
              />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0" />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}