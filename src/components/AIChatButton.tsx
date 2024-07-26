"use client";

import { Bot } from "lucide-react";
import { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <Drawer open={chatBoxOpen} onOpenChange={setChatBoxOpen} >
      <DrawerTrigger asChild>
        <button onClick={() => setChatBoxOpen(true)} className="custom-button-class">
          <Bot
            size={24}
            className="transition-all duration-300 hover:-translate-y-0.5 active:scale-95 active:shadow-inner "
          />
        </button>
      </DrawerTrigger>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </Drawer>
  );
}
