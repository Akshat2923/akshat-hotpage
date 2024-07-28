"use client";

import { Bot } from "lucide-react";
import { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
import chaticon from "@/assets/images/chaticon.png";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <Drawer open={chatBoxOpen} onOpenChange={setChatBoxOpen} >
      <DrawerTrigger asChild>
        <button onClick={() => setChatBoxOpen(true)}>
          <Image
            src={chaticon}
            alt="a memoji of a me"
            width={35}
            height={35}
            className="transition-all duration-300 hover:-translate-y-0.5 active:scale-95 active:shadow-inner "

          />
        </button>
      </DrawerTrigger>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </Drawer>
  );
}
