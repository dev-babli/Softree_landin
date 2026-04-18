/* eslint-disable @next/next/no-img-element */
"use client";

import { GradientWave } from "@/components/ui/gradient-wave";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import {
  Cpu,
  Database,
  Cloud,
  Code2,
  Palette,
  Layout,
} from "lucide-react";
import Link from "next/link";

const technologies = [
  {
    name: "Power Platform",
    designation: "Low-Code Solutions",
    description: "Build apps, automate workflows.",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    icon: <Cpu className="h-6 w-6 text-black" />,
  },
  {
    name: "Microsoft 365",
    designation: "Productivity Suite",
    description: "Collaborate and scale with Microsoft.",
    logo: "https://images.unsplash.com/photo-1618499891387-674191b57599?w=400&h=300&fit=crop",
    icon: <Cloud className="h-6 w-6 text-black" />,
  },
  {
    name: "Data & AI",
    designation: "Intelligent Solutions",
    description: "Transform data into insights.",
    logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    icon: <Database className="h-6 w-6 text-black" />,
  },
  {
    name: "Modern Apps",
    designation: "Cloud-Native Development",
    description: "Scalable digital products.",
    logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    icon: <Code2 className="h-6 w-6 text-black" />,
  },
];

export function HeroSection02() {
  return (
    <div className="min-h-screen relative">
      <div className="overflow-hidden flex flex-col px-6 items-center justify-center">
        <GradientWave className="absolute inset-0 opacity-50 dark:opacity-10" />
        <div className="flex w-full absolute z-20 top-4 px-4 justify-end">
          <Button asChild className="rounded-full">
            <Link href="/contact">Partner With Us</Link>
          </Button>
        </div>

        <div className="liquid-glass z-10 mx-auto mt-28 my-20 flex max-w-7xl flex-col space-y-10 rounded-xl p-10 shadow-2xl lg:p-20">
          <div className="flex justify-center flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <h1 className="text-3xl font-medium mix-blend-overlay md:text-5xl lg:text-8xl text-center text-white">
              Your Trusted
            </h1>
            <p className="max-w-md text-sm text-center lg:text-left text-white/80">
              Global Microsoft Technology Delivery Partner. Engineering support
              across Power Platform, Data, AI & Modern Applications.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex justify-center flex-wrap -space-y-4 -space-x-6">
              <div className="bg-white border text-black shadow-2xl h-20 w-20 rounded-full p-5 flex items-center justify-center">
                <Cpu className="h-8 w-8" />
              </div>
              <div className="bg-white border shadow-2xl h-20 w-20 rounded-full p-5 flex items-center justify-center">
                <Database className="h-8 w-8 text-black" />
              </div>
              <div className="bg-white hidden md:flex h-20 w-20 text-black border shadow-2xl rounded-full p-5 items-center justify-center">
                <Cloud className="h-8 w-8" />
              </div>
              <div className="bg-white h-20 w-20 border text-black shadow-2xl rounded-full p-5 flex items-center justify-center">
                <Code2 className="h-8 w-8" />
              </div>
              <div className="bg-white hidden md:flex h-20 w-20 text-black border shadow-2xl rounded-full p-5 items-center justify-center">
                <Palette className="h-8 w-8" />
              </div>
              <div className="bg-white h-20 w-20 border shadow-2xl rounded-full p-5 flex items-center justify-center">
                <Layout className="h-8 w-8 text-black" />
              </div>
            </div>
            <h1 className="text-3xl font-medium mix-blend-overlay md:text-5xl lg:text-8xl text-center text-white">
              Technology Partner
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end gap-10">
            <h1 className="underline font-medium text-3xl mix-blend-overlay md:text-5xl lg:text-8xl text-center text-white">
              Learn & Create
            </h1>
            <Button asChild className="px-20 h-20 rounded-full text-lg">
              <Link href="/contact">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full z-10 relative flex flex-col items-center">
        <p className="text-center text-muted-foreground mb-10 text-lg z-10 relative">
          Some of the technologies we deliver
        </p>
        <Marquee className="w-full">
          {technologies.map((tech, index) => (
            <div key={index} className="h-full">
              <div className="liquid-glass mx-10 flex h-full min-w-[220px] items-center gap-3 overflow-visible rounded-xl">
                <div className="absolute bg-white border-r -z-50 p-3 rounded-l-md -left-[50px] top-6">
                  {tech.icon}
                </div>
                <div className="flex flex-col px-4 py-3 flex-1">
                  <h3 className="font-semibold text-md text-white">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tech.designation}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tech.description}
                  </p>
                </div>
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="h-full w-36 object-cover rounded-r-xl"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
