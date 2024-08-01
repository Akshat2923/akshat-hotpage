import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { Bot, SendHorizontal, Trash, XCircle } from "lucide-react";
import Link from "next/link";
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
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import chaticon from "@/assets/images/chaticon.png";
import ponder from "@/assets/images/ponder.png";
import ShineBorder from "./magicui/shine-border";
import AnimatedGradientText from "./magicui/animated-gradient-text";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { H3 } from "./ui/H3";
import Marquee from "./magicui/marquee";

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>;
}

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
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
    <DrawerContent className="mx-auto flex h-[75vh] flex-col rounded-t-2xl sm:w-full lg:max-w-2xl">
      <DrawerHeader>
        <DrawerTitle>
          <HoverCard>
            <HoverCardTrigger>
              <AnimatedGradientText>
                <span
                  className={cn(
                    `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                  )}
                >
                  Hot Page AI
                </span>
              </AnimatedGradientText>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="mb-1 text-sm">Ask me anything about my Hot Page!</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <span role="img" aria-label="design">
                    🙋‍♂️
                  </span>{" "}
                  Handles follow up questions.
                </div>
                <div>
                  <span role="img" aria-label="connection">
                    🔗
                  </span>{" "}
                  Provides external links to relevant resources.
                </div>
                <div>
                  <span role="img" aria-label="connection">
                    📑
                  </span>{" "}
                  Find specific information about me on relevant pages.
                </div>
                <div>
                  <span role="img" aria-label="connection">
                    🚀
                  </span>{" "}
                  Powered by the latest GPT-4o-mini model from OpenAI
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </DrawerTitle>
      </DrawerHeader>
      <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id} onClose={onClose} />
        ))}
        {isLoading && lastMessageIsUser && (
          <ChatMessage
            message={{
              id: "loading",
              role: "assistant",
              content: "thinking",
            }}
            onClose={onClose}
          />
        )}
        {error && (
          <ChatMessage
            message={{
              id: "error",
              role: "assistant",
              content: "Something went wrong. Please try again!",
            }}
            onClose={onClose}
          />
        )}
        {!error && messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <ShineBorder
              className="bg-transparent"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderRadius={9999}
            >
              <Image
                src={chaticon}
                alt="a memoji of a me"
                width={100}
                height={100}
              />
            </ShineBorder>
            <p className="text-lg font-medium">
              Send a message to start the Hot Page AI chat!
            </p>
            <p className="text-sm font-medium">
              Don&apos;t know what to ask? Here are some starters...
            </p>
            <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden  bg-background ">
              <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((questions) => (
                  <QuestionCard key={questions.body} {...questions} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((questions) => (
                  <QuestionCard key={questions.body} {...questions} />
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>
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
            className="flex-1 rounded-2xl border bg-background px-3 py-2"
            ref={inputRef}
          />

          <Button type="submit" disabled={input.length === 0}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </DrawerFooter>
    </DrawerContent>
  );
}

interface ChatMessageProps {
  message: Message;
  onClose: () => void;
}

function ChatMessage({
  message: { role, content, id },
  onClose,
}: ChatMessageProps) {
  const isAiMessage = role === "assistant";
  const isThinking = content === "thinking";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && (
        <Image
          src={isThinking ? ponder : chaticon}
          alt={isThinking ? "Thinking..." : "AI assistant"}
          width={isThinking ? 50 : 35}
          height={isThinking ? 50 : 35}
          className={
            isThinking ? "mr-2 flex-none animate-float" : "mr-2 flex-none"
          }
        />
      )}
      {!isThinking && (
        <div
          className={cn(
            "rounded-2xl border px-3 py-2",
            isAiMessage ? "bg-background" : "bg-foreground text-background",
          )}
        >
          <ReactMarkdown
            components={{
              a: ({ node, ref, ...props }) => (
                <Badge
                  variant="outline"
                  className="transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800"
                >
                  <Link
                    {...props}
                    href={props.href ?? ""}
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      onClose();
                    }}
                  />
                </Badge>
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
      )}
    </div>
  );
}

const questions = [
  {
    body: "Tell me about yourself.",
  },
  {
    body: "Why did you choose computer science?",
  },
  {
    body: "What are some of your favorite programming languages?",
  },
  {
    body: "What experiences have you had working in the tech industry?",
  },
  {
    body: "What are your biggest challenges in your career?",
  },
  {
    body: "What motivates you to pursue a career in computer science?",
  },
  {
    body: "What are some of your favorite hobbies or interests?",
  },
  {
    body: "What schools or universities have you attended?",
  },
  {
    body: "What hard skills and soft skills do you have?",
  },
  {
    body: "Can I see you resume?",
  },
  {
    body: "Do you have LinkedIn or GitHub profiles?",
  },
  {
    body: "How do you like to spend your free time?",
  },
  {
    body: "How can I get in touch with you?",
  },
  {
    body: "What projects have you worked on outside of class?",
  },
  {
    body: "What are you passionate about?",
  },
];

const firstRow = questions.slice(0, questions.length / 2);
const secondRow = questions.slice(questions.length / 2);

const QuestionCard = ({ body }: { body: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <blockquote className="text-sm">{body}</blockquote>
    </figure>
  );
};
