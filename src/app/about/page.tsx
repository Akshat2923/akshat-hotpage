"use client";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function Page() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  const softSkills = [
    "Adaptable",
    "Communicator",
    "Collaborative Learner",
    "Problem Solver",
    "Creative",
  ];
  return (
    <section className="space-y-6">
      <H1>About Me</H1>
      <section className="space-y-3">
        <Alert className="shadow-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Who am I?</AlertTitle>
          <AlertDescription>
            <p>
              My name is Akshat Saladi and I am a fourth-year student at the
              Ohio State University studying computer science and engineering.
            </p>
            <p>
              I am very passionate about front-end development/mobile
              development. I am eager to learn more from others around me and
              help others along the way!
            </p>
          </AlertDescription>
        </Alert>
        <Alert className="shadow-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>What drives me?</AlertTitle>
          <AlertDescription>
            <p>
              One thing that you won&apos;t see on my resume is my ability to
              help other people in need. Especially in the context and in the
              world of tech when you are given the opportunity and the gift of
              working on some exciting and innovative projects it makes it even
              more rewarding when a feature might be able to directly help
              someone struggling with something in their daily life. My backbone
              purpose behind performing technical projects whether it&apos;s
              individual or in the workplace is &quot;How can I create something
              that&apos;ll streamline or solve someone&apos;s problems
              throughout their normal days?&quot; I believe that is a great
              definition of a software engineer at the end of the day.
            </p>
          </AlertDescription>
        </Alert>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Skills</H2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge>Java</Badge>
              <Badge>TypeScript/JavaScript</Badge>
              <Badge>Python</Badge>
              <Badge>C++</Badge>
              <Badge>C</Badge>
              <Badge>R</Badge>
              <Badge>Ruby</Badge>
              <Badge>SQL</Badge>
              <Badge>HTML/CSS</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>React Native</Badge>
              <Badge>Next.js</Badge>
              <Badge>Vue.js</Badge>
              <Badge>Ruby on Rails</Badge>
              <Badge>Shiny</Badge>
            </div>
          </div>
          <div className="space-y-3">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-xs"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-xl font-semibold">Adaptable</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-xl font-semibold">
                          Communicator
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-xl font-semibold">
                          Collaborative Learner
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-xl font-semibold">
                          Problem Solver
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-xl font-semibold">Creative</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
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
