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
import { H3 } from "@/components/ui/H3";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import simonsays from "@/assets/images/simonsays.jpg";

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
              <Card className="w-full sm:w-[350px]">
                <CardHeader>
                  <CardTitle>Full Stack Developer</CardTitle>
                  <CardDescription>
                    <a
                      href="https://www.theblokapp.com/"
                      className="text-primary hover:underline"
                    >
                      The BLOK App
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
                        <Badge>T3 Turborepo</Badge>
                        <Badge>Expo</Badge>
                        <Badge>React Native</Badge>
                        <Badge>Tailwind CSS</Badge>
                        <Badge>TypeScript</Badge>
                        <Badge>tRPC</Badge>
                        <Badge>Next.js</Badge>
                        <Badge>Drizzle</Badge>
                        <Badge>Supabase</Badge>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        What features have you built?
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-inside list-disc space-y-1">
                          <li>
                            Collaborating with team members to translate Figma
                            designs such as a create event modal, a
                            comprehensive search feature, user privacy states,
                            and a calendar view.
                          </li>
                          <li>
                            Connected the frontend and backend, allowing for
                            features like user search, profile viewing, and
                            follow requests to be updated in real-time in the
                            database and reflected in the frontend.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How had this experience been unique?
                      </AccordionTrigger>
                      <AccordionContent>
                        This experience has been uniquely rewarding in several
                        ways. The opportunity to work in a small, team allows
                        for close collaboration . The progress we make each week
                        is satisfying. The anticipation of launching our
                        app adds excitement to the work. Overall, the
                        combination of teamwork, consistent progress, and the
                        prospect of launching our app is making this experience
                        rewarding.
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
              <Card className="w-full sm:w-[350px]">
                <CardHeader>
                  <CardTitle>Solution Engineer Intern</CardTitle>
                  <CardDescription>
                    American Electric Power (AEP)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        What did I work on and its impact?
                      </AccordionTrigger>
                      <AccordionContent className="text-left">
                        <ul className="list-inside list-disc space-y-1">
                          <li>
                            Built a Python Shiny app from scratch, incorporating
                            the OpenCV2 computer vision library to analyze drone
                            image data. Explores potential improvements in
                            maintenance efficiency and worker safety by reducing
                            the need for unnecessary fieldwork.
                          </li>
                          <li>
                            Redesigned the front end of a production R Shiny app
                            that determines optimal battery placement,
                            transforming a cluttered tab-based layout into a
                            streamlined drop-down menu system. Significantly
                            improving user experience and longterm
                            maintainability.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        What is a technical achievements you are most proud of?
                      </AccordionTrigger>
                      <AccordionContent className="text-left">
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
                        development projects I worked on.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>What did I learn?</AccordionTrigger>
                      <AccordionContent className="flex flex-wrap gap-2">
                        <Badge>Shiny Framework</Badge>
                        <Badge>SQL</Badge>
                        <Badge>Databases</Badge>
                        <Badge>Docker</Badge>
                        <Badge>Git & Github Actions</Badge>
                        <Badge>Adaptability</Badge>
                        <Badge>Communication</Badge>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Side Projects</H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Smart Portfolio Website</CardTitle>
              <CardDescription>
                Built this innovative portfolio website that uses an AI chatbot
                to answer questions about related to this page, saving time
                instead of searching for answers.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <a href="https://github.com/Akshat2923/akshat-hotpage">
                <GitHubIcon fontSize="large" />
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

          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Indoor Navigation Assistant (HackOHI/O)</CardTitle>
              <CardDescription>
                Developed a full-stack Android application. Utilizes the
                device's rear camera to pinpoint the user’s precise location
                within indoor spaces. Uses reference key points from a realtime
                database of over 50 photos to determine the shortest path to the
                user’s selected destination.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <a href="https://github.com/Akshat2923/akshat_nAvii">
                <GitHubIcon fontSize="large" />
              </a>
              <a href="https://buckeyemailosu-my.sharepoint.com/:v:/g/personal/saladi_4_buckeyemail_osu_edu/EZ1Jvype4eBBpjJs5v_noRsB-pdTNE6Dhimh-AqbRrYhng?e=8fO6PJ&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D">
                <YouTubeIcon fontSize="large" />
              </a>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge>Kotlin</Badge>
              <Badge>Android Studio</Badge>
              <Badge>Firebase</Badge>
              <Badge>team-setting</Badge>
            </CardFooter>
          </Card>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Simon Says</CardTitle>
              <CardDescription>
                Designed and developed an interactive Simon Says game using
                Arduino and C, featuring a system of 4 LEDs and 4 corresponding
                buttons. Players memorize and replicate sequential LED patterns.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <a href="https://buckeyemailosu-my.sharepoint.com/:v:/g/personal/saladi_4_buckeyemail_osu_edu/EXGnVKlRiotAmqd7Myp0TRoB7KvU6mkhhF7bAoMZEJDS2g?e=arvF9H&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D">
                <YouTubeIcon fontSize="large" />
              </a>
              <Dialog>
                <DialogTrigger asChild>
                  <PhotoIcon fontSize="large" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <Image
                    src={simonsays}
                    alt="a photo of me"
                    width={300}
                    height={300}
                    className="rounded-md"
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Badge>Arduino Kit</Badge>
              <Badge>Arduino IDE</Badge>
              <Badge>C</Badge>
            </CardFooter>
          </Card>

          <Card className="w-[350px]">
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
              <a href="https://buckeyemailosu-my.sharepoint.com/:v:/g/personal/saladi_4_buckeyemail_osu_edu/EXGnVKlRiotAmqd7Myp0TRoB7KvU6mkhhF7bAoMZEJDS2g?e=arvF9H&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D">
                <YouTubeIcon fontSize="large" />
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
