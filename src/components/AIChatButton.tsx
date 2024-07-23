"use client";

import { Bot } from "lucide-react";
import { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <Drawer open={chatBoxOpen} onOpenChange={setChatBoxOpen}>
      <DrawerTrigger asChild>
        <button onClick={() => setChatBoxOpen(true)}>
          <Bot size={24} />
        </button>
      </DrawerTrigger>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </Drawer>
  );
}
