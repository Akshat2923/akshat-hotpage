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
import zoomieIcon from "@/assets/images/ZoomieSpike-watchOS-Default-1088@1x.png";
import { Button } from "@/components/ui/button";

export default function ZoomiePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <section className="space-y-6">
      <section className="space-y-3">
        <div className="lg:min-h-screen-md grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:grid-rows-1">
          <Card className="col-span-1 flex transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800 sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:row-start-1">
            <CardHeader>
              <CardTitle>Three Rings</CardTitle>
              <CardDescription>
                <strong>Paws</strong> — your dog&apos;s movement and steps.{" "}
                <strong>Playtime</strong> — active play duration.{" "}
                <strong>Wags</strong> — interactive play and activity.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-2 lg:row-span-1 lg:row-start-1">
            <CardHeader>
              <CardTitle>Close your dog&apos;s rings.</CardTitle>
              <CardDescription>
                Zoomie is a dog activity tracker built around the rings your
                pup closes every day. Track movement, play, and interactive
                activity — then watch progress add up across daily, weekly, and
                monthly views.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-1 lg:row-start-2">
            <CardHeader>
              <CardTitle>Give Your Dog Some Wags</CardTitle>
              <CardDescription>
                Turn your dog&apos;s photo into a game. Snap a photo, Zoomie
                identifies your dog&apos;s joints, place emojis around them — and
                those interactions count as Wags.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-1 lg:row-start-3">
            <CardHeader>
              <CardTitle>See How Your Dog Moves</CardTitle>
              <CardDescription>
                Heat maps, bar graphs, daily activity, weekly trends, and ring
                completion — Zoomie goes from cute game to useful insight for
                owners who want the full picture.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:col-start-4 lg:row-span-1 lg:row-start-2">
            <CardHeader>
              <CardTitle>Your Activity Counts, Too</CardTitle>
              <CardDescription>
                Your dog&apos;s walks and activity can contribute to your own
                Apple Fitness rings — steps, walking minutes, exercise minutes,
                and more. Your dog gets active → you get active → both of you
                make progress.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="col-span-1 sm:col-span-1 lg:col-span-1 lg:col-start-4 lg:row-span-1 lg:row-start-3">
            <CardHeader>
              <CardTitle>Every Dog Gets Their Own Rings</CardTitle>
              <CardDescription>
                Multiple dogs, separate profiles, individual progress, activity,
                and widgets — so a multi-dog household never feels squeezed into
                one account.
              </CardDescription>
            </CardHeader>
          </Card>

          <ShineBorder
            className="order-first col-span-2 flex items-center justify-center bg-transparent sm:col-span-3 md:col-span-4 lg:order-none lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-2"
            color={"dark" ? "white" : "black"}
            borderRadius={16}
          >
            <CardHeader>
              <CardTitle className="flex flex-col items-center text-center text-3xl font-bold tracking-tight sm:text-4xl">
                <Image
                  src={zoomieIcon}
                  alt="Zoomie app icon"
                  width={220}
                  height={220}
                  className="mb-4 animate-float"
                />
                <span>Zoomie</span>
                <span className="mt-1 text-base font-normal text-muted-foreground">
                  Dog Activity Tracker — Close your dog&apos;s rings.
                </span>

              </CardTitle>
            </CardHeader>
          </ShineBorder>

          <Card className="col-span-2 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-4">
            <CardHeader className="pb-2">
              <CardTitle>Playtime, Live.</CardTitle>
              <CardDescription>
                Start a session and Zoomie keeps playtime visible on your Lock
                Screen or Dynamic Island.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-xs">
              <Badge className="px-2 py-0.5">Live Activity</Badge>
              <Badge className="px-2 py-0.5">Dynamic Island</Badge>
              <Badge className="px-2 py-0.5">Lock Screen</Badge>
              <Badge className="px-2 py-0.5">Session tracking</Badge>
            </CardContent>
          </Card>

          <Card className="col-span-2 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md active:scale-95 active:shadow-inner dark:hover:bg-gray-800 sm:col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-4">
            <CardHeader className="pb-2">
              <CardTitle>Good Dogs Get Treats</CardTitle>
              <CardDescription>
                Move, play, complete goals — earn Treats along the way.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-xs">
              <Badge className="px-2 py-0.5">Goals</Badge>
              <Badge className="px-2 py-0.5">Streaks</Badge>
              <Badge className="px-2 py-0.5">Treats</Badge>
              <Badge className="px-2 py-0.5">Ring completion</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>

      <section className="space-y-3">
        <H2>Wags</H2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Give Your Dog Some Wags</CardTitle>
              <CardDescription>
                Snap a photo of your dog, add emojis to their joints, and watch
                the wags roll in. Zoomie identifies joint positions from the
                photo so play feels personal — and every tap counts toward the
                Wags ring.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Interactive by Design</CardTitle>
              <CardDescription>
                Wags aren&apos;t just a metric — they&apos;re a mini-game built
                around your dog. Photo in, emojis on, activity out. Fun for you,
                progress for them.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>

      <section className="space-y-3">
        <H2>Playtime</H2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Start &amp; Stop Sessions</CardTitle>
              <CardDescription>
                Tap to start playtime, tap to stop — Zoomie tracks duration and
                feeds it straight into your dog&apos;s rings.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Playtime, Live.</CardTitle>
              <CardDescription>
                Start playing and Zoomie keeps the session visible right on your
                Lock Screen or Dynamic Island — no need to keep the app open.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Lock Screen Controls</CardTitle>
              <CardDescription>
                Control active play sessions from the Lock Screen while you&apos;re
                mid-zoomie with your pup.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>

      <section className="space-y-3">
        <H2>Just Ask Siri</H2>
        <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
          <CardHeader>
            <CardTitle>&ldquo;Hey Siri, start a playtime in Zoomie.&rdquo;</CardTitle>
            <CardDescription>
              Using App Intents and Siri Shortcuts, you can trigger Zoomie
              actions without opening the app — start playtime, check progress,
              and stay hands-free when your hands are full of tennis balls.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>App Intents</Badge>
            <Badge>Siri Shortcuts</Badge>
            <Badge>Hands-free</Badge>
          </CardContent>
        </Card>
      </section>

      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>

      <section className="space-y-3">
        <H2>Apple Fitness Integration</H2>
        <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
          <CardHeader>
            <CardTitle>Your Dog&apos;s Activity Counts for You, Too.</CardTitle>
            <CardDescription>
              Your dog&apos;s walks and activity can also contribute to your own
              Fitness rings — steps, walking minutes, exercise minutes, and more
              where applicable. The loop is simple: your dog gets active, you get
              active, and both of you make progress together.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>HealthKit</Badge>
            <Badge>Apple Fitness</Badge>
            <Badge>Shared progress</Badge>
          </CardContent>
        </Card>
      </section>

      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>

      <section className="space-y-3">
        <H2>Multiple Dogs</H2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Every Dog Gets Their Own Rings</CardTitle>
              <CardDescription>
                Separate profiles, individual progress, individual activity, and
                individual widgets — built for households with more than one good
                boy or girl.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Per-Dog Tracking</CardTitle>
              <CardDescription>
                Each dog&apos;s Paws, Playtime, and Wags rings stay independent.
                Switch profiles in a tap and see exactly how every pup is doing.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>

      <section className="space-y-3">
        <H2>Widgets</H2>
        <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
          <CardHeader>
            <CardTitle>A Little Zoomie, Right on Your Home Screen.</CardTitle>
            <CardDescription>
              Glance at your dog&apos;s rings, daily activity, and progress
              without opening the app. Widgets support multiple dogs and multiple
              sizes — a little Zoomie wherever you need it.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>Home Screen widgets</Badge>
            <Badge>Ring progress</Badge>
            <Badge>Multiple dogs</Badge>
            <Badge>WidgetKit</Badge>
          </CardContent>
        </Card>
      </section>

      <ShineBorder color={"dark" ? "white" : "black"} borderWidth={1}>
        <hr className="border-muted" />
      </ShineBorder>

      <section className="space-y-3">
        <H2>Insights</H2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>
                Daily, weekly, and monthly views with trends, progress, and
                activity breakdowns over time.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner">
            <CardHeader>
              <CardTitle>Bar Graphs &amp; Heat Maps</CardTitle>
              <CardDescription>
                Visualize when and how your dog moves — spot patterns, busy days,
                and quiet stretches at a glance.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:shadow-inner sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Ring Completion</CardTitle>
              <CardDescription>
                Track how often Paws, Playtime, and Wags close — and how your
                dog&apos;s habits evolve week over week.
              </CardDescription>
            </CardHeader>
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
              Zoomie is built Apple-first — native rings, Live Activities,
              Widgets, App Intents, and HealthKit integration, all designed to
              feel at home on iPhone.
            </p>
          </div>
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs md:w-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {[
                "Swift",
                "SwiftUI",
                "HealthKit",
                "WidgetKit",
                "App Intents",
                "Live Activities",
              ].map((tech) => (
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
          <Link href="/zoomie/privacy">
            <Button variant="outline">Privacy Policy</Button>
          </Link>
        </div>
      </section>
    </section>
  );
}
