"use client";
import { H1 } from "@/components/ui/H1";
import Image from "next/image";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import computer from "@/assets/images/comp.png";
import think from "@/assets/images/think.png";
import ponder from "@/assets/images/ponder.png";
import osu from "@/assets/images/Ohio State Logo.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function Page() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );
  const aboutPlugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <section className="space-y-6">
      <section className="space-y-3">
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:h-screen lg:grid-cols-4 lg:grid-rows-4">
          <Card className="col-span-1 flex sm:col-span-1 lg:col-span-1 lg:row-span-1">
            <CardHeader>
              <CardTitle>School</CardTitle>
              <CardDescription>
                <Image
                  src={osu}
                  alt="a picture of a ponder"
                  width={300}
                  height={300}
                />
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-1 flex sm:col-span-1 lg:col-span-1 lg:row-span-1">
            <CardHeader>
              <CardTitle>Major</CardTitle>
              <CardDescription>
                I am currently in my final year of pursuing a{" "}
                <strong>B.S. in Computer Science and Engineering.</strong>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1">
            <CardHeader>
              <CardTitle>Passion</CardTitle>
              <CardDescription>
                I am very passionate about{" "}
                <strong>front-end development/mobile development. </strong>I am
                eager to learn more from others around me and help others along
                the way!
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="sm:col-span- col-span-2 md:col-span-2 lg:col-span-1 lg:row-span-2">
            <CardHeader>
              <CardTitle>Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>DS & Algos</Badge>
                <Badge>Databases</Badge>
                <Badge>Web Apps</Badge>
                <Badge>Networking</Badge>
                <Badge>Operating Sys</Badge>
                <Badge>Computer Org</Badge>
                <Badge>Software Dev & Design</Badge>
                <Badge>Linear Algebra</Badge>
                <Badge>Electronics</Badge>
                <Badge>Statistics</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1">
            <CardHeader>
              <CardTitle>Free Time?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Learn new skills</Badge>
                <Badge>Working out</Badge>
                <Badge>Basketball</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1">
            <CardHeader>
              <CardTitle>Favorite language?</CardTitle>
              <CardDescription>
                Currently I am really enjoying <strong>TypeScript</strong>. I
                much prefer its type safety over js.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="order-first col-span-2 bg-transparent sm:col-span-3 md:col-span-4 lg:order-none lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-2">
            <CardHeader>
              <CardTitle className="flex flex-col items-center">
                <Image
                  src={ponder}
                  alt="a picture of a ponder"
                  width={300}
                  height={300}
                />
                Get to Know Me!
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="col-span-2 max-h-96 overflow-y-auto sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1">
            <CardHeader>
              <CardTitle>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What Drives Me?</AccordionTrigger>
                    <AccordionContent>
                      One thing that you won&apos;t see on my resume is my
                      ability to help other people in need. Especially in the
                      context and in the world of tech when you are given the
                      opportunity and the gift of working on some exciting and
                      innovative projects it makes it even more rewarding when a
                      feature might be able to directly help someone struggling
                      with something in their daily life. My backbone purpose
                      behind performing technical projects whether it&apos;s
                      individual or in the workplace is{" "}
                      <strong>
                        &quot;How can I create something that&apos;ll streamline
                        or solve someone&apos;s problems throughout their normal
                        days?&quot;
                      </strong>{" "}
                      I believe that is a great definition of a software
                      engineer at the end of the day.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Image
                  src={think}
                  alt="a picture of a thinking"
                  width={100}
                  height={100}
                  className="mx-auto"
                />
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="col-span-2 max-h-96 overflow-y-auto sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1">
            <CardHeader>
              <CardTitle>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Why Computer Science?</AccordionTrigger>
                    <AccordionContent>
                      Computer Science is a beautiful degree because of its
                      modularity and impact. This field allows people to make
                      small changes in software that can affect people on a
                      broader scale. Every year since 6th grade, I would always
                      look forward to each of Apple's Worldwide Developers
                      Conference (WWDC) and product launches live, ecstatic to
                      hear about the newest features coming to the next iOS
                      because at the end of the day this affects people on a
                      day-to-day basis. It was at WWDC that I was first
                      introduced to Swift and XCode, sparking my interest in the
                      field, also a little inspiration for the styling of this
                      page :). However nothing is easy in life. The challenges
                      that I&apos;ve faced throughout my undergrad have been
                      I could&apos;ve imagined. But I believe that this
                      will make you the best of people in the world, and my
                      ability to pursue a STEM degree alongside these hardships
                      will better me as a person.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Image
                  src={computer}
                  alt="a picture of a thinking"
                  width={100}
                  height={100}
                  className="mx-auto"
                />
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Skills</H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <H3>Languages</H3>
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
            <H3>Frameworks</H3>
            <div className="flex flex-wrap gap-2">
              <Badge>React Native</Badge>
              <Badge>Expo</Badge>
              <Badge>Next.js</Badge>
              <Badge>Vue.js</Badge>
              <Badge>Ruby on Rails</Badge>
              <Badge>Shiny</Badge>
            </div>
            <H3>Tools</H3>
            <div className="flex flex-wrap gap-2">
              <Badge>Git</Badge>
              <Badge>Arduino</Badge>
              <Badge>Jira</Badge>
              <Badge>Agile Methodologies</Badge>
              <Badge>VSCode</Badge>
              <Badge>Docker</Badge>
            </div>
          </div>
          <div className="space-y-3">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-xs md:w-auto"
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
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            <a
              href="https://github.com/Akshat2923"
              className="p-1 text-primary hover:underline"
            >
              Github
            </a>
            <GitHubIcon className="h-4 w-4" />
          </Badge>
          <Badge variant="outline">
            <a
              href="https://www.linkedin.com/in/akshatsaladi/"
              className="p-1 text-primary hover:underline"
            >
              LinkedIn
            </a>
            <LinkedInIcon className="h-4 w-4" />
          </Badge>
        </div>
      </section>
    </section>
  );
}
