import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
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
                  <CardDescription>The BLOK App</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        What tech stack does this app use?
                      </AccordionTrigger>
                      <AccordionContent>
                        This app leverages a comprehensive T3 Turborepo
                        architecture encompassing a Expo React Native and
                        Tailwind CSS frontend, tRPC and Next.js for backend,
                        Drizzle as the ORM, Supabase for database management.
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
                        Working with a small team has been a unique experience
                        because we all are learning as we go trying to bootstrap
                        this and launch to users
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
                      <AccordionTrigger>
                        What did I work on and its impact?
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-inside list-disc space-y-1">
                          <li>
                            Built a Python Shiny app from scratch, incorporating
                            the OpenCV2 computer vision library to analyze drone
                            image data.
                            <li>
                              Explores potential improvements in maintenance
                              efficiency and worker safety by reducing the need
                              for unnecessary fieldwork.
                            </li>
                          </li>
                          <li>
                            Redesigned the front end of a production R Shiny app
                            that determines optimal battery placement,
                            transforming a cluttered tab-based layout into a
                            streamlined drop-down menu system.
                            <li>
                              Significantly improving user experience and
                              longterm maintainability.
                            </li>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        What is a technical achievements you are most proud of?
                      </AccordionTrigger>
                      <AccordionContent>
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
                      <AccordionContent>
                        <H3>Hard Skills</H3>
                        <p>Frontend</p>
                        <Badge>R and Python Shiny</Badge>
                        <p>Backend</p>
                        <Badge>SQL & Databases</Badge>
                        <p>Other</p>
                        <Badge>Git & Github Actions</Badge>
                        <Badge>Docker</Badge>
                        <H3>Soft Skills</H3>
                        <Badge>Adaptability</Badge>
                        <p>Style & logic of existing code bases/apps</p>
                        <Badge>Communication</Badge>
                        <p>
                          Received valuable feedback on my work during meetings
                        </p>
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
      </section>
    </section>
  );
}
