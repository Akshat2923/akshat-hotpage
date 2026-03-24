"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { H2 } from "@/components/ui/H2";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ShineBorder from "@/components/magicui/shine-border";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";
import fogIcon from "@/assets/images/FogIcon-watchOS-Default-1088x1088@1x.png";
import { Button } from "@/components/ui/button";

export default function FogPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <section className="space-y-6">
      <section className="space-y-3">
        <div className="lg:min-h-screen-md grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:grid-rows-1">

          {/* Top-left: Auto-Organized (mirrors School card) */}
          <Card className="col-span-1 flex transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800 sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:row-start-1">
            <CardHeader>
              <CardTitle>Auto-Organized</CardTitle>
              <CardDescription>
                Notes sort themselves into smart collections called{" "}
                <strong>Clouds</strong> as you write — no folders, no filing,
                no effort.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Top-right wide: tagline — spans cols 2-4 on large */}
          <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-2 lg:row-span-1 lg:row-start-1">
            <CardHeader>
              <CardTitle>Clear your Fog.</CardTitle>
              <CardDescription>
                If you&apos;ve ever abandoned a notes app because keeping
                folders tidy felt like a second job, Fog was built for you.
                Just write. Fog automatically groups your notes into smart
                collections, so you always know where everything is — without
                lifting a finger.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Left row 2: Live Cloud Grouping */}
          <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-1 lg:row-start-2">
            <CardHeader>
              <CardTitle>Live Cloud Grouping</CardTitle>
              <CardDescription>
                As you write, related notes are grouped into{" "}
                <strong>Clouds in real time</strong> — the UI updates
                instantly so your notes are always organized without any
                manual sorting.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Left row 3: Ask Your Notes */}
          <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-1 lg:row-start-3">
            <CardHeader>
              <CardTitle>Ask Your Notes</CardTitle>
              <CardDescription>
                Search for anything. If there&apos;s no direct match, the
                on-device model <strong>generates a relevant answer</strong>{" "}
                based on the context across all your notes.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Right row 2: Privacy & iCloud Sync */}
          <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:col-start-4 lg:row-span-1 lg:row-start-2">
            <CardHeader>
              <CardTitle>Private & In Sync</CardTitle>
              <CardDescription>
                Syncs securely across your devices via{" "}
                <strong>iCloud (CloudKit)</strong> — Apple first-party,
                end-to-end encrypted. Your notes stay yours, always.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Right row 3: On-Device AI */}
          <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:col-start-4 lg:row-span-1 lg:row-start-3">
            <CardHeader>
              <CardTitle>On-Device AI</CardTitle>
              <CardDescription>
                Powered by <strong>Apple&apos;s Foundations Model</strong> —
                fully offline, no server, no API calls. Your data never
                leaves your device to be processed.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Center: Fog icon with ShineBorder — 2 rows only */}
          <ShineBorder
            className="order-first col-span-2 flex items-center justify-center bg-transparent sm:col-span-3 md:col-span-4 lg:order-none lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-2"
            color={"dark" ? "white" : "black"}
            borderRadius={16}
          >
            <CardHeader>
              <CardTitle className="flex flex-col items-center text-center text-3xl font-bold tracking-tight sm:text-4xl">
                <Image
                  src={fogIcon}
                  alt="Fog app icon"
                  width={220}
                  height={220}
                  className="mb-4 animate-float"
                />
                <span>Fog</span>
                <span className="mt-1 text-base font-normal text-muted-foreground">
                  Notes that organize themselves.
                </span>
              </CardTitle>
            </CardHeader>
          </ShineBorder>

          {/* Bottom row: 4 cards spanning full width — like the "Why" cards in about */}
          <Card className="col-span-2 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-4">
            <CardHeader className="pb-2">
              <CardTitle>Rich Formatting</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-xs">
              <Badge className="px-2 py-0.5">Bold</Badge>
              <Badge className="px-2 py-0.5">Italic</Badge>
              <Badge className="px-2 py-0.5">Underline</Badge>
              <Badge className="px-2 py-0.5">Headings</Badge>
              <Badge className="px-2 py-0.5">Lists</Badge>
            </CardContent>
          </Card>

          <Card className="col-span-2 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-4">
            <CardHeader className="pb-2">
              <CardTitle>Themes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-xs">
              <Badge className="px-2 py-0.5">Custom gradient</Badge>
              <Badge className="px-2 py-0.5">Font styles</Badge>
              <Badge className="px-2 py-0.5">App colors</Badge>
            </CardContent>
          </Card>

        </div>
      </section>

      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>

      <section className="space-y-3">
        <H2>Built With</H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2 md:self-center">
            <p className="text-sm text-muted-foreground">
              Fog is built entirely with Apple-first technologies — running
              fully on-device with no third-party dependencies.
            </p>
          </div>
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs md:w-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {["Swift", "SwiftUI", "SwiftData", "CloudKit", "Foundations Model"].map((tech) => (
                <CarouselItem key={tech}>
                  <div className="p-1">
                    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-xl font-semibold">{tech}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
              href="mailto:akshatcanbuild@gmail.com"
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

      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>

      <section className="space-y-3">
      <div className="flex flex-wrap gap-2">

        <Link href="/fog/privacy">
          <Button variant="outline">Privacy Policy</Button>
        </Link>
        </div>
      </section>
    </section>
  );
}
