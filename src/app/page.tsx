import { H1 } from "@/components/ui/H1";
import { Metadata } from "next";
import Image from "next/image";
import pic from "@/assets/images/pic.jpg";
import { H2 } from "@/components/ui/H2";
import { Bot } from "lucide-react";
import hi from "@/assets/images/hi.png";
import shrug from "@/assets/images/shrug.png";
import ShineBorder from "@/components/magicui/shine-border";

export const metadata: Metadata = {
  title: "Akshat Saladi - My Hot Page",
  description: "Welcome to my Hot Page with a custom AI chatbot",
};

export default function Home() {
  return (
    <section id="home" className="space-y-16 px-1 py-8">
      <section className="grid-col-1 grid items-center gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <H1 className="text-center sm:text-start">
            <span className="inline">Hey, I&apos;m Akshat Saladi</span>
            <Image
              src={hi}
              alt="a memoji of a me saying hi"
              width={50}
              height={50}
              className="ml-2 inline-block aspect-square rounded-full object-cover align-text-bottom transition-all hover:-translate-y-1.5 "
            />
          </H1>
          <p className="text-center sm:text-start">
            Welcome to my Hot Page. This website is a personal portfolio where I
            showcase my work and skills. Click the top bar links to learn more
            about me!
          </p>
        </div>
        <div className="flex justify-center">
          <ShineBorder
            className="bg-transparent"
            color={"dark" ? "white" : "black"}
            borderRadius={9999}
          >
            <Image
              src={pic}
              alt="a photo of me"
              width={300}
              height={300}
              className="aspect-square rounded-full object-cover shadow-md [object-position:right_10%_bottom_60%] dark:border-foreground"
            />
          </ShineBorder>
        </div>
      </section>
      <section className="space-y-3 text-center">
        <H2>
          <Image
            src={shrug}
            alt="a memoji of a me shrugging"
            width={40}
            height={40}
            className="mr-2 inline-block aspect-square rounded-full object-cover align-text-bottom transition-all hover:-translate-y-1.5 "
          />
          <span className="inline">Don&apos;t know where to start?</span>
        </H2>
        <p>
          Click the memoji icon in the top right to open the chatbot. You can
          ask it anything you want about me!
        </p>
      </section>
    </section>
  );
}
