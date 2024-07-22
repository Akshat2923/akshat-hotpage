import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about me.",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <H1>About Me</H1>
      <section className="space-y-3">
        <H2>Who am I?</H2>
        <p>
          My name is Akshat Saladi and I am a fourth-year student at the Ohio
          State University studying computer science and engineering.
        </p>
        <p>
          I am very passionate about front-end development/mobile development. I
          am eager to learn more from others around me and help others along the
          way!
        </p>
        <H2>What drives me?</H2>
        <p>
          One thing that you won't see on my resume is my ability to help other
          people in need. Especially in the context and in the world of tech
          when you are given the opportunity and the gift of working on some
          exciting and innovative projects it makes it even more rewarding when
          a feature might be able to directly help someone struggling with
          something in their daily life. My backbone purpose behind performing
          technical projects whether it's individual or in the workplace is "How
          can I create something that'll streamline or solve someone's problems
          throughout their normal days?" I believe that is a great definition of
          a software engineer at the end of the day.
        </p>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Skills</H2>
        <H3>Languages</H3>
        <ul className="list-inside list-disc space-y-1">
          <li>Java</li>
          <li>TypeScript/JavaScript</li>
          <li>Python</li>
          <li>C++</li>
          <li>C</li>
          <li>R</li>
          <li>Ruby</li>
          <li>SQL</li>
          <li>HTML/CSS</li>
        </ul>
        <H3>Frameworks</H3>
        <ul className="list-inside list-disc space-y-1">
          <li>React Native</li>
          <li>Next.js</li>
          <li>Vue.js</li>
          <li>Ruby on Rails</li>
          <li>Shiny</li>
        </ul>
        <H3>Soft Skills</H3>
        <ul className="list-inside list-disc space-y-1">
          <li>Adaptable</li>
          <li>Communicator</li>
          <li>Collaboritve Learner</li>
          <li>Problem Solver</li>
          <li>Creative</li>
        </ul>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Contact</H2>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <a
              href="https://www.linkedin.com/in/akshatsaladi/"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Akshat2923"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </section>
  );
}
