import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import * as React from "react";
import Image from "next/image";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import blok from "@/assets/images/icon.png";
import aep from "@/assets/images/AEP logo.svg.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhotoIcon from "@mui/icons-material/Photo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import simonsays from "@/assets/images/simonsays.jpg";
import { Button } from "@/components/ui/button";
import ShineBorder from "@/components/magicui/shine-border";

export const metadata: Metadata = {
  title: "Experience",
  description: "Learn more about my work.",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <H1>My Work</H1>
      <section className="space-y-3">
        <H2>Experience</H2>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent>
              March 2024 - Present
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="filled" color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card className="w-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner sm:w-[350px]">
                <CardHeader>
                  <CardTitle>Full Stack Developer</CardTitle>
                  <CardDescription>
                    <a
                      target="_blank"
                      href="https://www.theblokapp.com/"
                      className="flex items-center gap-2 hover:text-primary hover:underline"
                    >
                      The BLOK App
                      <Image
                        src={blok}
                        alt="a picture of the BLOK app logo"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        What tech stack does this app use?
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-wrap gap-2">
                        <Badge variant="secondary">T3 Turborepo</Badge>
                        <Badge variant="secondary">Expo</Badge>
                        <Badge variant="secondary">React Native</Badge>
                        <Badge variant="secondary">Tailwind CSS</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="secondary">tRPC</Badge>
                        <Badge variant="secondary">Next.js</Badge>
                        <Badge variant="secondary">Drizzle</Badge>
                        <Badge variant="secondary">Supabase</Badge>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        What features have you built?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-muted-foreground">
                          <div>
                            <span role="img" aria-label="design">
                              🎨
                            </span>{" "}
                            Collaborating with team members to translate Figma
                            designs such as a create event modal, a
                            comprehensive search feature, user privacy states,
                            and a calendar view.
                          </div>
                          <div>
                            <span role="img" aria-label="connection">
                              🔗
                            </span>{" "}
                            Connected the frontend and backend, allowing for
                            features like user search, profile viewing, and
                            follow requests to be updated in real-time in the
                            database and reflected in the frontend.
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How had this experience been unique?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        This experience has been uniquely rewarding in several
                        ways. The opportunity to work in a small, team allows
                        for close collaboration . The progress we make each week
                        is satisfying. The anticipation of launching our app
                        adds excitement to the work. Overall, the combination of
                        teamwork, consistent progress, and the prospect of
                        launching our app is making this experience rewarding.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              May 2023 - August 2023
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="error" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card className="w-full text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner sm:w-[350px]">
                <CardHeader>
                  <CardTitle>Solution Engineer Intern</CardTitle>
                  <CardDescription>
                    <a
                      target="_blank"
                      href="https://www.aep.com/"
                      className="flex items-center gap-2 hover:text-primary hover:underline"
                    >
                      <span>American Electric Power (AEP)</span>
                      <Image
                        src={aep}
                        alt="a picture of the AEP logo"
                        width={20}
                        height={20}
                      />
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        What did I work on and its impact?
                      </AccordionTrigger>
                      <AccordionContent className="text-left">
                        <div className="space-y-2 text-muted-foreground">
                          <div>
                            <span role="img" aria-label="drone">
                              🌆
                            </span>{" "}
                            Built a Python Shiny app from scratch, incorporating
                            the OpenCV2 computer vision library to analyze drone
                            image data. Explores potential improvements in
                            maintenance efficiency and worker safety by reducing
                            the need for unnecessary fieldwork.
                          </div>
                          <div>
                            <span role="img" aria-label="battery">
                              🔋
                            </span>{" "}
                            Redesigned the front end of a production R Shiny app
                            that determines optimal battery placement,
                            transforming a cluttered tab-based layout into a
                            streamlined drop-down menu system. Significantly
                            improving user experience and longterm
                            maintainability.
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        What is a technical achievements you are most proud of?
                      </AccordionTrigger>
                      <AccordionContent className="text-left text-muted-foreground">
                        My role was a Solution Engineer on the Data Science
                        team. During the onboarding process I realized I was not
                        familiar with the tech stack the team used which was
                        Python and R Shiny which are frontend frameworks they
                        utilize for their internal projects. I thought learning
                        this stack would delay a lot of my work, but I found
                        that to be the complete opposite. As I was looking
                        through official documentation, googling, and of course
                        annoying my mentor 24/7 I found that many of the same
                        concepts and logic carried over from past web
                        development projects I worked on. This experience
                        showcases my adaptability and quick learning abilities.
                        Despite initially being unfamiliar with the Python and R
                        Shiny tech stack, I was able to rapidly get up to speed
                        and contribute effectively to the team&apos;s projects.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        What did I learn?
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Shiny Framework</Badge>
                        <Badge variant="secondary">SQL</Badge>
                        <Badge variant="secondary">Databases</Badge>
                        <Badge variant="secondary">Docker</Badge>
                        <Badge variant="secondary">Git & Github Actions</Badge>
                        <Badge variant="secondary">Adaptability</Badge>
                        <Badge variant="secondary">Communication</Badge>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </section>
      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>{" "}
      <section className="space-y-3">
        <H2>Projects</H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="w-[350px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Chill Pill <i>in development...</i></CardTitle>
              <CardDescription>
                A medication tracking app but with a twist. It will help people
                take their medication thorugh the use of postive reinforcement.
                The goal is to relieve any negative feelings that come
                with taking medication to ultimately help the person to the
                finisline, 100%.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {/* <a
                target="_blank"
                href="https://github.com/Akshat2923/akshat-hotpage"
              >
                <GitHubIcon
                  fontSize="large"
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                />
              </a> */}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge>Mobile App</Badge>
            </CardFooter>
          </Card>
          <Card className="w-[350px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>iOS To Do List App</CardTitle>
              <CardDescription>
                Built a simple easy-to-use iOS To Do List app. Users can log in
                with a simple authentication and logout keeping track of the
                state of their tasks. Users can create new tasks with paramaters
                such as title, time, and due date. You can also check off tasks
                as completed and delete them.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <a target="_blank" href="https://github.com/Akshat2923/ToDoList">
                <GitHubIcon
                  fontSize="large"
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                />
              </a>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
              <Badge>Swift</Badge>
              <Badge>SwiftUI</Badge>
              <Badge>Firebase</Badge>
            </CardFooter>
          </Card>
          <Card className="w-[350px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Smart Portfolio Website</CardTitle>
              <CardDescription>
                Built this innovative portfolio website that uses an AI chatbot
                to answer questions about related to this page, saving time
                instead of searching for answers.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <a
                target="_blank"
                href="https://github.com/Akshat2923/akshat-hotpage"
              >
                <GitHubIcon
                  fontSize="large"
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                />
              </a>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge>Next.js 14</Badge>
              <Badge>Vercel AI SDK</Badge>
              <Badge>Langchain</Badge>
              <Badge>gpt-4o-mini</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Tailwind CSS</Badge>
            </CardFooter>
          </Card>

          <Card className="w-[350px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Indoor Navigation Assistant (HackOHI/O)</CardTitle>
              <CardDescription>
                Developed a full-stack Android application. Utilizes the
                device&apos;s rear camera to pinpoint the user&apos;s precise
                within indoor spaces. Uses reference key points from a realtime
                database of over 50 photos to determine the shortest path to the
                user&apos;s selected destination.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <a
                target="_blank"
                href="https://github.com/Akshat2923/akshat_nAvii"
              >
                <GitHubIcon
                  fontSize="large"
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                />
              </a>
              <a
                target="_blank"
                href="https://buckeyemailosu-my.sharepoint.com/:v:/g/personal/saladi_4_buckeyemail_osu_edu/EZ1Jvype4eBBpjJs5v_noRsB-pdTNE6Dhimh-AqbRrYhng?e=8fO6PJ&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D"
              >
                <YouTubeIcon
                  fontSize="large"
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                />
              </a>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
              <Badge>Kotlin</Badge>
              <Badge>Android Studio</Badge>
              <Badge>Firebase</Badge>
              <Badge>team-setting</Badge>
            </CardFooter>
          </Card>
          <Card className="w-[350px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Simon Says</CardTitle>
              <CardDescription>
                Designed and developed an interactive Simon Says game using
                Arduino and C, featuring a system of 4 LEDs and 4 corresponding
                buttons. Players memorize and replicate sequential LED patterns.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <a
                target="_blank"
                href="https://buckeyemailosu-my.sharepoint.com/:v:/g/personal/saladi_4_buckeyemail_osu_edu/EXGnVKlRiotAmqd7Myp0TRoB7KvU6mkhhF7bAoMZEJDS2g?e=arvF9H&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D"
              >
                <YouTubeIcon
                  fontSize="large"
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                />
              </a>
              <Dialog>
                <DialogTrigger asChild>
                  <PhotoIcon
                    fontSize="large"
                    sx={{
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <Image
                    src={simonsays}
                    alt="a photo of the arduino board simon says layout"
                    width={400}
                    height={400}
                    className="rounded-2xl"
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
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge>Arduino Kit</Badge>
              <Badge>Arduino IDE</Badge>
              <Badge>C</Badge>
            </CardFooter>
          </Card>

          <Card className="w-[350px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Smart Irrigation Tracker</CardTitle>
              <CardDescription>
                Collaborated with students in Ethiopia to build a prototype
                irrigation tracker with an Arduino and C. Implemented agile
                methodology and acquired diverse perspectives, resembling a
                remote workplace.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <a
                target="_blank"
                href="https://buckeyemailosu-my.sharepoint.com/:v:/g/personal/saladi_4_buckeyemail_osu_edu/EXGnVKlRiotAmqd7Myp0TRoB7KvU6mkhhF7bAoMZEJDS2g?e=arvF9H&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D"
              >
                <YouTubeIcon
                  fontSize="large"
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                />
              </a>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge>Arduino Kit</Badge>
              <Badge>Arduino IDE</Badge>
              <Badge>C</Badge>
              <Badge>Agile Methodology</Badge>
              <Badge>team-setting</Badge>
            </CardFooter>
          </Card>
        </div>
      </section>
    </section>
  );
}
