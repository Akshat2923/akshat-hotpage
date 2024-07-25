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
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:grid-rows-4 lg:auto-rows-min lg:min-h-screen">
  {/* School Card */}
  <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 flex flex-col">
    <CardHeader className="flex-grow">
      <CardTitle>School</CardTitle>
      <CardDescription className="flex justify-center items-center h-full">
        <Image
          src={osu}
          alt="a picture of OSU"
          width={300}
          height={300}
          className="max-w-full max-h-full object-contain"
        />
      </CardDescription>
    </CardHeader>
  </Card>

  {/* Major Card */}
  <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 flex flex-col">
    <CardHeader className="flex-grow">
      <CardTitle>Major</CardTitle>
      <CardDescription className="overflow-auto">
        I am currently in my final year of pursuing a{" "}
        <strong>B.S. in Computer Science and Engineering.</strong>
      </CardDescription>
    </CardHeader>
  </Card>

  {/* Passion Card */}
  <Card className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 flex flex-col">
    <CardHeader className="flex-grow">
      <CardTitle>Passion</CardTitle>
      <CardDescription className="overflow-auto">
        I am very passionate about{" "}
        <strong>front-end development/mobile development. </strong>I am
        eager to learn more from others around me and help others along
        the way!
      </CardDescription>
    </CardHeader>
  </Card>

  {/* Courses Card */}
  <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col">
    <CardHeader>
      <CardTitle>Courses</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow overflow-auto">
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

  {/* Free Time Card */}
  <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 flex flex-col">
    <CardHeader>
      <CardTitle>Free Time?</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow overflow-auto">
      <div className="flex flex-wrap gap-2">
        <Badge>Learn new skills</Badge>
        <Badge>Working out</Badge>
        <Badge>Basketball</Badge>
      </div>
    </CardContent>
  </Card>

  {/* Favorite Language Card */}
  <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 flex flex-col">
    <CardHeader className="flex-grow">
      <CardTitle>Favorite language?</CardTitle>
      <CardDescription className="overflow-auto">
        Currently I am really enjoying <strong>TypeScript</strong>. I
        much prefer its type safety over js.
      </CardDescription>
    </CardHeader>
  </Card>

  {/* Get to Know Me Card */}
  <Card className="order-first col-span-2 bg-transparent sm:col-span-3 md:col-span-4 lg:order-none lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-2 flex flex-col">
    <CardHeader className="flex-grow flex flex-col items-center justify-center">
      <CardTitle className="text-center">
        <Image
          src={ponder}
          alt="a picture of a ponder"
          width={300}
          height={300}
          className="max-w-full max-h-full object-contain"
        />
        Get to Know Me!
      </CardTitle>
    </CardHeader>
  </Card>

  {/* What Drives Me Card */}
  <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1 flex flex-col">
    <CardHeader className="flex-grow">
      <CardTitle>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What Drives Me?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground overflow-auto max-h-40">
              {/* Content here */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Image
          src={think}
          alt="a picture of thinking"
          width={100}
          height={100}
          className="mx-auto mt-2"
        />
      </CardTitle>
    </CardHeader>
  </Card>

  {/* Why Computer Science Card */}
  <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1 flex flex-col">
    <CardHeader className="flex-grow">
      <CardTitle>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Why Computer Science?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground overflow-auto max-h-40">
              {/* Content here */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Image
          src={computer}
          alt="a picture of a computer"
          width={100}
          height={100}
          className="mx-auto mt-2"
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
