import { H1 } from "@/components/ui/H1";
import { Metadata } from "next";
import Image from "next/image";
import pic from "@/assets/images/pic.jpg";
import { H2 } from "@/components/ui/H2";
import { Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "Akshat Saladi - My Hot Page",
  description: "Welcome to my Hot Page with a custom AI chatbot",
};

export default function Home() {
  return (
    <section
      id="home"
      className="space-y-16 px-1 py-8"
    >
      <section className="grid-col-1 grid items-center gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <H1 className="text-center sm:text-start">
            Hey, I&apos;m Akshat Saladi 👋
          </H1>
          <p className="text-center sm:text-start">
            Welcome to my Hot Page. This
            website is a smart personal portfolio where I showcase my work and
            skills. Click the top bar links to learn more about me!
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src={pic}
            alt="a photo of me"
            width={300}
            height={300}
            className="aspect-square rounded-full border-2 object-cover shadow-md dark:border-foreground [object-position:right_10%_bottom_60%]"
          />
        </div>
      </section>
      <section className="space-y-3 text-center">
        <H2>...Or ask the chatbot anything</H2>
        <p>
          Click the <Bot className="inline pb-1" /> icon in the top bar
          to active the chatbot. You can ask it anything you want about me!
        </p>
      </section>
    </section>
  );
}
