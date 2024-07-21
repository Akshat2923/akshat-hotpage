import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about my work.",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <H1>My Work</H1>
      <section className="space-y-3">
        <H2>Experience</H2>
        
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Side Projects</H2>
      </section>
    </section>
  );
}