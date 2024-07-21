import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
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
        <p>
          I am currently seeking a SWE focused full time roles for the after
          spring 2025.
        </p>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Skills</H2>
        <p>
          <strong>React Native</strong>
        </p>
      </section>
      <hr className="border-muted" />
    </section>
  );
}
