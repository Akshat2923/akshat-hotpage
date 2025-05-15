"use client";
import Image from "next/image";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";

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
import osu from "@/assets/images/OSU Logo.png";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";
import ShineBorder from "@/components/magicui/shine-border";
import { Car } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
export default function Page() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <section className="space-y-6">
      <section className="space-y-3">
        <div className="lg:min-h-screen-md grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:grid-rows-1">
          <Card className="col-span-1 flex transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800 sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:row-start-1">
            <CardHeader>
              <CardTitle>School</CardTitle>
              <CardDescription>
                <a href="https://cse.osu.edu/" target="_blank">
                  <Image
                    src={osu}
                    alt="a picture OSU Logo"
                    className="mt-6 w-full"
                  />
                </a>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-1 flex sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:row-start-1">
            <CardHeader>
              <CardTitle>Major</CardTitle>
              <CardDescription>
                <strong>B.S. in Computer Science & Engineering. </strong>
                Expected graduation date of{" "}
                <strong>
                  May 2025
                  <SchoolIcon fontSize="small" />.
                </strong>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-1">
            <CardHeader>
              <CardTitle>Passion</CardTitle>
              <CardDescription>
                I am very passionate about{" "}
                <strong>front-end development/mobile development. </strong>I am
                eager to learn more from others around me and help others along
                the way! I always strive to create something that is performant, beautiful, and easy to use.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-2">
            <CardHeader>
              <CardTitle>Courses</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-xs">
              <Badge variant="secondary" className="px-2 py-0.5">
                DS & Algos
              </Badge>
              <Badge variant="secondary" className="px-2 py-0.5">
                Databases
              </Badge>
              <Badge variant="secondary" className="px-2 py-0.5">
                Web Apps
              </Badge>
              <Badge variant="secondary" className="px-2 py-0.5">
                Networking
              </Badge>
              <Badge variant="secondary" className="px-2 py-0.5">
                Operating Sys
              </Badge>
              <Badge variant="secondary" className="px-2 py-0.5">
                Computer Org
              </Badge>
              <Badge variant="secondary" className="px-2 py-0.5">
                Software Dev
              </Badge>
              <Badge variant="secondary" className="px-2 py-0.5">
                Linear Algebra
              </Badge>
              <Badge variant="secondary" className="px-2 py-0.5">
                Electronics
              </Badge>
              <Badge variant="secondary" className="px-2 py-0.5">
                Statistics
              </Badge>
            </CardContent>
          </Card>
          <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:col-start-4 lg:row-span-1 lg:row-start-2">
            <CardHeader>
              <CardTitle>Favorite language?</CardTitle>
              <CardDescription>
                Currently I am really enjoying <strong>TypeScript</strong>{" "}
                because I prefer its type safety and code maintainability.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:col-start-4 lg:row-span-1 lg:row-start-3">
            <CardHeader className="pb-2">
              <CardTitle>Free Time?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-xs">
              <Badge className="px-2 py-0.5">Learn new skills</Badge>
              <Badge className="px-2 py-0.5">Working out</Badge>
              <Badge className="px-2 py-0.5">Basketball</Badge>
            </CardContent>
          </Card>
          <ShineBorder
            className="order-first col-span-2 flex items-center justify-center bg-transparent sm:col-span-3 md:col-span-4 lg:order-none lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-2"
            color={"dark" ? "white" : "black"}
            borderRadius={16}
          >
            <CardHeader>
              <CardTitle className="flex flex-col items-center text-center text-3xl font-bold tracking-tight sm:text-4xl">
                <Image
                  src={ponder}
                  alt="a memoji of me pondering"
                  width={250}
                  height={250}
                  className="mb-4 animate-float"
                />
                <span>About Me</span>
              </CardTitle>
            </CardHeader>
          </ShineBorder>

          {/* <Card className="order-first col-span-2 flex items-center justify-center bg-transparent sm:col-span-3 md:col-span-4 lg:order-none lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-2">
            <CardHeader>
              <CardTitle className="flex flex-col items-center text-center text-3xl font-bold tracking-tight sm:text-4xl">
                <Image
                  src={ponder}
                  alt="a memoji of me pondering"
                  width={250}
                  height={250}
                  className="mb-4 animate-float"
                />
                <span>About Me</span>
              </CardTitle>
            </CardHeader>
          </Card> */}

          <Dialog>
            <DialogTrigger asChild>
              <Card className="col-span-2 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1">
                <CardHeader>
                  <CardTitle className="text-center">
                    What Drives Me?{" "}
                    <Image
                      src={think}
                      alt="a memoji of me thinking"
                      width={100}
                      height={100}
                      className="mx-auto"
                    />
                  </CardTitle>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent className="text-muted-foreground sm:max-w-[425px] lg:max-w-[700px]">
              One thing that you won&apos;t see on my resume is my ability to
              help other people in need. Especially in the context and in the
              world of tech when you are given the opportunity and the gift of
              working on some exciting and innovative projects it makes it even
              more rewarding when a feature might be able to directly help
              someone struggling with something in their daily life. My backbone
              purpose behind performing technical projects whether it&apos;s
              individual or in the workplace is{" "}
              <strong>
                &quot;How can I create something that&apos;ll streamline or
                solve someone&apos;s problems throughout their normal
                days?&quot;
              </strong>{" "}
              I believe that is a great definition of a software engineer at the
              end of the day.{" "}
              <Image
                src={think}
                alt="a memoji of me thinking"
                width={50}
                height={50}
                className="mx-auto"
              />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="col-span-2 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1">
                <CardHeader>
                  <CardTitle className="text-center">
                    Why Computer Science?{" "}
                    <Image
                      src={computer}
                      alt="a memoji of me and a computer"
                      width={100}
                      height={100}
                      className="mx-auto"
                    />
                  </CardTitle>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent className="text-muted-foreground sm:max-w-[425px] lg:max-w-[700px]">
              Computer Science is a beautiful degree because of its modularity
              and impact.{" "}
              <strong>
                This field allows people to make small changes in software that
                can affect people on a broader scale.
              </strong>{" "}
              Every year since 6th grade, I would always look forward to each of
              Apple&apos;s Worldwide Developers Conference (WWDC) and product
              launches live, ecstatic to hear about the newest features coming
              to the next iOS because at the end of the day this affects people
              on a day-to-day basis. It was at WWDC that I was first introduced
              to Swift and XCode, sparking my interest in the field, also a
              little inspiration for the styling of this page :). However
              nothing is easy in life. The challenges that I&apos;ve faced
              throughout my undergrad have been unimaginable. But I
              believe that this will make you the best of people in the world,
              and my ability to pursue Computer Science alongside these
              hardships will better me as a person.
              <Image
                src={computer}
                alt="a memoji of me and a computer"
                width={50}
                height={50}
                className="mx-auto"
              />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>{" "}
      <section className="space-y-3">
        <H2>Skills</H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <H3>Languages</H3>
            <div className="flex flex-wrap gap-2">
              <Badge>Java</Badge>
              <Badge>Kotlin</Badge>
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
              <Badge>React.js</Badge>
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
                    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-xl font-semibold">Adaptable</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner ">
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
                    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
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
                    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
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
                    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
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
      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>
      <section className="space-y-3">
        <H2>Contact</H2>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800"
          >
            <a
              target="_blank"
              href="https://github.com/Akshat2923"
              className="p-1 text-primary hover:underline"
            >
              Github
            </a>
            <GitHubIcon className="h-4 w-4" />
          </Badge>
          <Badge
            variant="outline"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800"
          >
            <a
              target="_blank"
              href="https://www.linkedin.com/in/akshatsaladi/"
              className="p-1 text-primary hover:underline"
            >
              LinkedIn
            </a>
            <LinkedInIcon className="h-4 w-4" />
          </Badge>
          <Badge
            variant="outline"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800"
          >
            <a
              href="mailto:saladi.4@buckeyemail.osu.edu"
              className="p-1 text-primary hover:underline"
            >
              Email
            </a>
            <EmailIcon className="h-4 w-4" />
          </Badge>
          <Badge
            variant="outline"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800"
          >
            <a
              target="_blank"
              href="https://github.com/Akshat2923/Resume/blob/bf2c0d35c40a451ba539688fac906476749ef71e/akshat_saladi_osu_resume.pdf"
              className="p-1 text-primary hover:underline"
            >
              Resume
            </a>
            <DescriptionIcon className="h-4 w-4" />
          </Badge>
        </div>
      </section>
    </section>
  );
}
