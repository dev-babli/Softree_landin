"use client"

import { motion } from "framer-motion"

export function ForDevelopersSection() {
  return (
    <section className="flex w-full justify-center bg-[#070707] px-4 py-24 md:px-6">
      <div className="w-full max-w-[1240px]">
        <div className="flex flex-col gap-8">
          
          {/* Tag */}
          <div className="flex items-center gap-2 self-start border border-white px-2 py-1">
            <div className="size-[5.82px] bg-white"></div>
            <span className="font-mono text-sm text-white leading-normal tracking-[-0.28px]">FOR DEVELOPERS</span>
          </div>

          {/* ASCII Art Hero - Recreating the raw HTML structure exactly for pixel-perfect match */}
          <div className="overflow-hidden overflow-x-auto pb-4">
            <pre className="select-none font-bold leading-tight tracking-[0.2em] md:tracking-[0.4em]" style={{ fontFamily: "Menlo, monospace", fontSize: "7.5px" }}>
              <div>
                <span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span>
              </div>
              <div>
                <span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span>
              </div>
              <div>
                <span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span>
              </div>
              <div>
                <span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span><span style={{ color: "#444" }}>░</span>
              </div>
              <div>
                <span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╔</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>║</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>█</span><span style={{ color: "#ffffff" }}>╗</span>
              </div>
              <div>
                <span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#444" }}>░</span><span style={{ color: "#ffffff" }}>╚</span><span style={{ color: "#ffffff" }}>═</span><span style={{ color: "#ffffff" }}>╝</span>
              </div>
            </pre>
          </div>

          <a className="flex w-fit items-center justify-center bg-white px-2 py-1.5 hover:bg-neutral-200 transition-colors" href="#">
            <span className="font-mono text-black text-sm leading-normal tracking-[-0.28px]">TRY IT OUT</span>
          </a>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 flex flex-col md:mt-20">
          
          {/* Row 1: Cards */}
          <div className="flex flex-col lg:flex-row">
            {/* Managed Auth card */}
            <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.4)" }} className="group relative flex h-auto min-h-[196px] w-full border border-[#2c2c2c] lg:block lg:w-[620px] overflow-hidden transition-colors duration-300">
              <div className="flex h-auto w-full flex-col gap-4 p-5 lg:h-[158px] lg:w-[434px] z-10 relative">
                <h3 className="font-medium text-white text-xl leading-[1.2]">Managed Auth</h3>
                <p className="max-w-[380px] text-[#ececec] text-base text-wrap-balance leading-[1.2] opacity-80">
                  OAuth, API keys, token refresh, lifecycle management. We handle all of it so you never think about auth again.
                </p>
                <a className="flex w-fit items-center justify-center bg-white/12 px-2 py-1.5 transition-colors duration-200 hover:bg-white/20" href="#">
                  <span className="font-mono text-sm text-white/64 leading-normal tracking-[-0.28px] group-hover:text-white transition-colors">LEARN MORE</span>
                </a>
              </div>
              <div className="w-[100px] shrink-0 overflow-hidden border-[#2c2c2c] border-l lg:absolute lg:top-0 lg:right-0 lg:h-[196px] lg:w-[166px]">
                <div className="size-full object-cover bg-[#161616] mix-blend-screen scale-100 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center text-white/10 font-mono text-xs">
                  {/* Mock art instead of actual image reference to prevent 404s */}
                  [AUTH ART]
                </div>
              </div>
            </motion.div>

            {/* Triggers card */}
            <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.4)" }} className="group relative -mt-px flex h-auto min-h-[196px] w-full border border-[#2c2c2c] lg:mt-0 lg:block lg:w-[620px] lg:-ml-px overflow-hidden transition-colors duration-300">
              <div className="flex h-auto w-full flex-col gap-4 p-5 lg:h-[158px] lg:w-[434px] z-10 relative">
                <h3 className="font-medium text-white text-xl leading-[1.2]">Triggers</h3>
                <p className="max-w-[380px] text-[#ececec] text-base text-wrap-balance leading-[1.2] opacity-80">
                  Bidirectional communication with your apps to keep your agents informed.
                </p>
                <a className="flex w-fit items-center justify-center bg-white/12 px-2 py-1.5 transition-colors duration-200 hover:bg-white/20" href="#">
                  <span className="font-mono text-sm text-white/64 leading-normal tracking-[-0.28px] group-hover:text-white transition-colors">LEARN MORE</span>
                </a>
              </div>
              <div className="w-[100px] shrink-0 overflow-hidden border-[#2c2c2c] border-l lg:absolute lg:top-0 lg:right-0 lg:h-[196px] lg:w-[166px]">
                <div className="size-full object-cover bg-[#161616] mix-blend-screen scale-100 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center text-white/10 font-mono text-xs">
                  [TRIGGERS ART]
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dividing network tracks */}
          <div className="hidden lg:block">
            <div className="relative h-[54px] w-full">
              <div className="absolute top-0 right-0 left-0 flex h-[27px]">
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "191px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "138px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "245px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "109px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "191px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "119px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "181px" }}></div>
                <div className="h-[27px] min-w-0 flex-1 border border-[#2c2c2c] bg-[#070707]"></div>
              </div>
              <div className="absolute top-[27px] right-0 left-0 flex h-[27px]">
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "124px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "259px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "124px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "191px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "191px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "124px" }}></div>
                <div className="h-[27px] shrink-0 border border-[#2c2c2c] bg-[#070707]" style={{ width: "88px" }}></div>
                <div className="h-[27px] min-w-0 flex-1 border border-[#2c2c2c] bg-[#070707]"></div>
              </div>
            </div>
          </div>

          {/* Row 2: Deep Dive Cards */}
          <div className="flex flex-col lg:flex-row">
            
            {/* Context Aware Sessions */}
            <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.4)" }} className="group relative -mt-px h-[350px] w-full overflow-hidden border border-[#2c2c2c] md:h-[350px] lg:mt-0 lg:h-[400px] lg:w-[620px] transition-colors duration-300">
              <div className="px-5 pt-6">
                <h3 className="text-2xl text-white leading-[1.2]">Context Aware Sessions</h3>
              </div>
              <div className="absolute inset-x-0 top-[60px] bottom-[118px] flex items-center justify-center px-5">
                <motion.div 
                  className="w-full max-w-[500px] overflow-hidden border border-white/[0.08] bg-[#141414]"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2 border-white/[0.06] border-b px-4 py-2.5 bg-[#0a0a0a]">
                    <div className="flex gap-1.5">
                      <div className="size-2.5 rounded-full bg-white/10"></div>
                      <div className="size-2.5 rounded-full bg-white/10"></div>
                      <div className="size-2.5 rounded-full bg-white/10"></div>
                    </div>
                    <span className="font-mono text-[10px] text-white/25">session.py</span>
                  </div>
                  <div className="px-4 py-4 font-mono text-[13px] leading-[1.7]">
                    <div className="flex"><span className="mr-4 select-none text-white/15">1</span><span className="text-white/90">session</span><span className="text-white/40"> = </span><span className="text-[#3fffdd]">composio</span><span className="text-white/40">.</span><span className="text-[#5b9cf4]">create</span><span className="text-white/40">(</span><span className="text-[#f0a46c]">user_id</span><span className="text-white/40">=</span><span className="text-[#a5d6a7]">"user_123"</span><span className="text-white/40">)</span></div>
                    <div className="flex"><span className="mr-4 select-none text-white/15">2</span><span className="text-white/90">tools</span><span className="text-white/40"> = </span><span className="text-white/90">session</span><span className="text-white/40">.</span><span className="text-[#5b9cf4]">tools</span><span className="text-white/40">()</span></div>
                    <div className="flex"><span className="mr-4 select-none text-white/15">3</span><span className="text-white/90">connection</span><span className="text-white/40"> = </span><span className="text-white/90">session</span><span className="text-white/40">.</span><span className="text-[#5b9cf4]">authorize</span><span className="text-white/40">(</span><span className="text-[#a5d6a7]">"github"</span><span className="text-white/40">)</span></div>
                  </div>
                </motion.div>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex h-auto flex-col gap-3 border-[#2c2c2c] border-t bg-[#0a0a0a] group-hover:bg-[#121212] transition-colors duration-300 p-4 md:p-[18px]">
                <p className="max-w-[480px] text-[#ececec] text-sm text-wrap-balance leading-[1.3] opacity-80 md:text-base md:leading-[1.2]">
                  Every session carries full context — sandbox state, files, progress. Your agent never starts from scratch.
                </p>
                <a className="flex w-fit items-center justify-center bg-white/12 px-2 py-1.5 transition-colors duration-200 hover:bg-white/20" href="#">
                  <span className="font-mono text-sm text-white/64 leading-normal tracking-[-0.28px] group-hover:text-white transition-colors">LEARN MORE</span>
                </a>
              </div>
            </motion.div>

            {/* Model & Framework Agnostic */}
            <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.4)" }} className="group relative -mt-px h-[350px] w-full overflow-hidden border border-[#2c2c2c] md:h-[350px] lg:mt-0 lg:h-[400px] lg:w-[620px] lg:-ml-px transition-colors duration-300">
              <div className="relative z-10 p-1 px-5 pt-6">
                <h3 className="text-2xl text-white leading-[1.2]">Model & Framework Agnostic</h3>
              </div>
              <div className="absolute inset-0">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                  
                  {/* Floating Box / Constellation SVG Rebuilt */}
                  <svg className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 620 400">
                    <defs>
                      <linearGradient id="cubeTopGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                        <stop offset="26%" stopColor="rgb(253, 255, 194)"></stop>
                        <stop offset="52%" stopColor="rgb(0, 255, 255)"></stop>
                        <stop offset="76%" stopColor="rgb(0, 137, 255)"></stop>
                      </linearGradient>
                      <linearGradient id="cubeLeftGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 150, 255, 0.3)"></stop>
                        <stop offset="100%" stopColor="rgba(0, 0, 170, 0.15)"></stop>
                      </linearGradient>
                      <linearGradient id="cubeRightGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 255, 255, 0.25)"></stop>
                        <stop offset="100%" stopColor="rgba(0, 70, 255, 0.1)"></stop>
                      </linearGradient>
                      <filter height="200%" id="cubeGlow" width="200%" x="-50%" y="-50%">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="8"></feGaussianBlur>
                        <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                      </filter>
                      <filter height="200%" id="logoShadow" width="200%" x="-50%" y="-50%">
                        <feDropShadow dx="0" dy="2" floodColor="rgba(0,0,0,0.7)" floodOpacity="1" stdDeviation="0.5"></feDropShadow>
                      </filter>
                      <clipPath id="cubeClip">
                        <polygon points="310,112.5 415,170 415,225 310,282.5 205,225 205,170"></polygon>
                      </clipPath>
                    </defs>

                    {/* Faint UI Tracker lines */}
                    <line stroke="white" strokeDasharray="4 4" strokeOpacity="0.18" strokeWidth="0.5" x1="0" x2="620" y1="170" y2="170"></line>
                    <line stroke="white" strokeDasharray="4 4" strokeOpacity="0.18" strokeWidth="0.5" x1="0" x2="620" y1="225" y2="225"></line>
                    <line stroke="white" strokeDasharray="4 4" strokeOpacity="0.18" strokeWidth="0.5" x1="160" x2="160" y1="0" y2="400"></line>
                    <line stroke="white" strokeDasharray="4 4" strokeOpacity="0.18" strokeWidth="0.5" x1="460" x2="460" y1="0" y2="400"></line>
                    
                    <polygon fill="none" points="310,95 460,170 310,245 160,170" stroke="white" strokeOpacity="0.5" strokeWidth="1.5"></polygon>
                    <polygon fill="none" points="460,225 310,300 160,225" stroke="white" strokeOpacity="0.1" strokeWidth="0.5"></polygon>
                    <line stroke="white" strokeOpacity="0.1" strokeWidth="0.5" x1="460" x2="460" y1="170" y2="225"></line>
                    <line stroke="white" strokeOpacity="0.1" strokeWidth="0.5" x1="310" x2="310" y1="245" y2="300"></line>
                    <line stroke="white" strokeOpacity="0.1" strokeWidth="0.5" x1="160" x2="160" y1="170" y2="225"></line>
                    
                    {/* Anchor dots */}
                    <rect fill="white" height="6" width="6" x="307" y="92"></rect>
                    <rect fill="white" height="6" width="6" x="457" y="167"></rect>
                    <rect fill="white" height="6" width="6" x="307" y="242"></rect>
                    <rect fill="white" height="6" width="6" x="157" y="167"></rect>
                    <rect fill="white" fillOpacity="0.3" height="6" width="6" x="457" y="222"></rect>
                    <rect fill="white" fillOpacity="0.3" height="6" width="6" x="307" y="297"></rect>
                    <rect fill="white" fillOpacity="0.3" height="6" width="6" x="157" y="222"></rect>
                    
                    <polygon fill="none" points="310,122.5 405,170 310,217.5 215,170" stroke="rgba(63, 255, 221, 0.3)" strokeWidth="0.75"></polygon>
                    
                    {/* Floating Cube Graphic */}
                    <g clipPath="url(#cubeClip)">
                      {/* THIS is the animated part. We use framer-motion to bounce it. */}
                      <motion.g 
                        opacity={0.87}
                        initial={{ y: -10 }}
                        animate={{ y: 10 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
                      >
                        <g filter="url(#cubeGlow)" opacity={0.5}>
                          <polygon fill="url(#cubeTopGrad)" points="310,122.5 405,170 310,217.5 215,170"></polygon>
                        </g>
                        <polygon fill="url(#cubeLeftGrad)" points="215,170 310,217.5 310,272.5 215,225"></polygon>
                        <polygon fill="url(#cubeRightGrad)" points="405,170 310,217.5 310,272.5 405,225"></polygon>
                        <polygon fill="url(#cubeTopGrad)" opacity={0.85} points="310,122.5 405,170 310,217.5 215,170"></polygon>
                        
                        <g filter="url(#logoShadow)" transform="translate(310, 170)">
                          <g transform="matrix(1, 0.5, -1, 0.5, 0, 0) scale(0.85)">
                            <text x="-40" y="4" fill="white" fontSize="40" fontWeight="bold" style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.5)"}}>
                              AI  {/* Mock instead of the missing gemini.svg */}
                            </text>
                          </g>
                        </g>
                      </motion.g>
                    </g>
                  </svg>
                  
                  {/* Floating labels under the cube */}
                  <div className="absolute inset-x-0 bottom-24 flex justify-center pb-2">
                    <motion.span 
                      className="font-mono text-[10px] text-white/40 uppercase tracking-wider"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      Gemini
                    </motion.span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 flex h-auto flex-col gap-3 border-[#2c2c2c] border-t bg-[#0a0a0a] group-hover:bg-[#121212] transition-colors duration-300 p-4 md:p-[18px]">
                <p className="max-w-[480px] text-[#ececec] text-sm text-wrap-balance leading-[1.3] opacity-80 md:text-base md:leading-[1.2]">
                  No lock-in. Swap models based on cost, capability, or use case. Your tools and auth carry over, zero rework.
                </p>
                <a className="flex w-fit items-center justify-center bg-white/12 px-2 py-1.5 transition-colors duration-200 hover:bg-white/20" href="#">
                  <span className="font-mono text-sm text-white/64 leading-normal tracking-[-0.28px] group-hover:text-white transition-colors">LEARN MORE</span>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
