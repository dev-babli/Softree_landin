"use client"

import { motion } from "framer-motion"

export function ForDevelopersSection() {
  return (
    <section className="flex w-full justify-center bg-[#0a0a0a] px-4 py-24 md:px-6">
      <div className="w-full max-w-[1240px]">
        <div className="flex flex-col gap-8">
          
          {/* Tag */}
          <div className="flex items-center gap-2 self-start bg-[#1a1a1a] border border-[#2c2c2c] px-3 py-1.5 rounded-sm">
            <div className="size-1.5 bg-[#ff4500] rounded-full"></div>
            <span className="font-mono text-[11px] text-[#a3a3a3] leading-normal tracking-widest uppercase">FOR ENTERPRISE TEAMS</span>
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

          <a className="flex w-fit items-center justify-center px-6 py-2.5 transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] rounded-sm shadow-[0_0_20px_rgba(255,69,0,0.3)]" style={{ background: "linear-gradient(135deg, #f5b99a 0%, #ff6b35 50%, #ff4500 100%)" }} href="/contact">
            <span className="font-mono text-white text-sm font-bold leading-normal tracking-[-0.28px]">BOOK A DISCOVERY CALL</span>
          </a>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 flex flex-col md:mt-20">
          
          {/* Row 1: Cards */}
          <div className="flex flex-col lg:flex-row">
            {/* Rapid Delivery card */}
            <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.4)" }} className="group relative flex h-auto min-h-[196px] w-full border border-[#2c2c2c] lg:block lg:w-[620px] overflow-hidden transition-colors duration-300">
              <div className="flex h-auto w-full flex-col gap-4 p-5 lg:h-[158px] lg:w-[434px] z-10 relative">
                <h3 className="font-medium text-white text-xl leading-[1.2]">Rapid, Predictable Delivery</h3>
                <p className="max-w-[380px] text-[#ececec] text-base text-wrap-balance leading-[1.2] opacity-80">
                  From discovery to go-live in weeks, not quarters. Fixed milestones, transparent reporting, no surprises.
                </p>
                <a className="flex w-fit items-center justify-center bg-[#1a1a1a] border border-[#2c2c2c] px-4 py-2 transition-all duration-200 hover:bg-[#222] hover:border-[#4a4a4a] hover:scale-[1.02] active:scale-[0.98] rounded-sm" href="/services">
                  <span className="font-mono text-xs text-[#a3a3a3] font-semibold leading-normal tracking-widest group-hover:text-white transition-colors">LEARN MORE</span>
                </a>
              </div>
              <div className="w-[100px] shrink-0 overflow-hidden border-[#2c2c2c] border-l lg:absolute lg:top-0 lg:right-0 lg:h-[196px] lg:w-[166px]">
                <div className="size-full bg-[#0d0d0d] flex items-center justify-center">
                  <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
                    <circle cx="40" cy="40" r="28" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                    <path d="M40 18 L40 40 L55 55" stroke="#0089ff" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="40" cy="40" r="3" fill="#0089ff"/>
                    {[0,60,120,180,240,300].map((deg,i) => {
                      const r=28, cx2=40+r*Math.cos(deg*Math.PI/180), cy2=40+r*Math.sin(deg*Math.PI/180)
                      return <circle key={i} cx={cx2} cy={cy2} r="2" fill="rgba(255,255,255,0.25)"/>
                    })}
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Enterprise Security card */}
            <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.4)" }} className="group relative -mt-px flex h-auto min-h-[196px] w-full border border-[#2c2c2c] lg:mt-0 lg:block lg:w-[620px] lg:-ml-px overflow-hidden transition-colors duration-300">
              <div className="flex h-auto w-full flex-col gap-4 p-5 lg:h-[158px] lg:w-[434px] z-10 relative">
                <h3 className="font-medium text-white text-xl leading-[1.2]">Enterprise-Grade Security</h3>
                <p className="max-w-[380px] text-[#ececec] text-base text-wrap-balance leading-[1.2] opacity-80">
                  SOC 2-aligned practices, role-based access, encrypted data pipelines, and full audit trails built in by default.
                </p>
                <a className="flex w-fit items-center justify-center bg-[#1a1a1a] border border-[#2c2c2c] px-4 py-2 transition-all duration-200 hover:bg-[#222] hover:border-[#4a4a4a] hover:scale-[1.02] active:scale-[0.98] rounded-sm" href="/services">
                  <span className="font-mono text-xs text-[#a3a3a3] font-semibold leading-normal tracking-widest group-hover:text-white transition-colors">LEARN MORE</span>
                </a>
              </div>
              <div className="w-[100px] shrink-0 overflow-hidden border-[#2c2c2c] border-l lg:absolute lg:top-0 lg:right-0 lg:h-[196px] lg:w-[166px]">
                <div className="size-full bg-[#0d0d0d] flex items-center justify-center">
                  <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
                    <path d="M40 14 L58 22 L58 40 C58 52 49 62 40 66 C31 62 22 52 22 40 L22 22 Z" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(0,137,255,0.05)"/>
                    <path d="M40 20 L52 26 L52 40 C52 49 46 57 40 60 C34 57 28 49 28 40 L28 26 Z" stroke="rgba(0,137,255,0.4)" strokeWidth="0.8" fill="none"/>
                    <path d="M34 40 L38 44 L46 36" stroke="#0089ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
            
            {/* Global Delivery card */}
            <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.4)" }} className="group relative -mt-px h-[350px] w-full overflow-hidden border border-[#2c2c2c] md:h-[350px] lg:mt-0 lg:h-[400px] lg:w-[620px] transition-colors duration-300">
              <div className="px-5 pt-6">
                <h3 className="text-2xl text-white leading-[1.2]">Global Delivery Network</h3>
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
                    <span className="font-mono text-[10px] text-white/25">delivery.ts</span>
                  </div>
                  <div className="px-4 py-4 font-mono text-[13px] leading-[1.7]">
                    <div className="flex"><span className="mr-4 select-none text-white/15">1</span><span className="text-[#5b9cf4]">import</span><span className="text-white/40"> </span><span className="text-white/90">{'{ '}</span><span className="text-[#3fffdd]">CloudPipeline</span><span className="text-white/90">{' }'}</span><span className="text-white/40"> from </span><span className="text-[#a5d6a7]">"@softree/infra"</span></div>
                    <div className="flex"><span className="mr-4 select-none text-white/15">2</span><span className="text-white/40"></span></div>
                    <div className="flex"><span className="mr-4 select-none text-white/15">3</span><span className="text-[#f0a46c]">const</span><span className="text-white/40"> </span><span className="text-white/90">cluster</span><span className="text-white/40"> = </span><span className="text-[#f0a46c]">new</span><span className="text-white/40"> </span><span className="text-[#3fffdd]">CloudPipeline</span><span className="text-white/40">(</span><span className="text-[#a5d6a7]">"enterprise-tier"</span><span className="text-white/40">)</span></div>
                    <div className="flex"><span className="mr-4 select-none text-white/15">4</span><span className="text-white/90">cluster</span><span className="text-white/40">.</span><span className="text-[#5b9cf4]">enableZeroTrustSecurity</span><span className="text-white/40">()</span></div>
                    <div className="flex"><span className="mr-4 select-none text-white/15">5</span><span className="text-[#f0a46c]">await</span><span className="text-white/40"> </span><span className="text-white/90">cluster</span><span className="text-white/40">.</span><span className="text-[#5b9cf4]">deployAll</span><span className="text-white/40">{"({ "}</span><span className="text-white/90">region</span><span className="text-white/40">{": "}</span><span className="text-[#a5d6a7]">"global"</span><span className="text-white/40">{" })"}</span></div>
                  </div>
                </motion.div>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex h-auto flex-col gap-3 border-[#2c2c2c] border-t bg-[#0a0a0a] group-hover:bg-[#121212] transition-colors duration-300 p-4 md:p-[18px]">
                <p className="max-w-[480px] text-[#ececec] text-sm text-wrap-balance leading-[1.3] opacity-80 md:text-base md:leading-[1.2]">
                  Teams across UK, US, India, and Middle East — one delivery model, zero handoff gaps, consistent quality.
                </p>
                <a className="flex w-fit items-center justify-center bg-[#1a1a1a] border border-[#2c2c2c] px-4 py-2 transition-all duration-200 hover:bg-[#222] hover:border-[#4a4a4a] hover:scale-[1.02] active:scale-[0.98] rounded-sm" href="/contact">
                  <span className="font-mono text-xs text-[#a3a3a3] font-semibold leading-normal tracking-widest group-hover:text-white transition-colors">LEARN MORE</span>
                </a>
              </div>
            </motion.div>

            {/* Model & Framework Agnostic */}
            <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.4)" }} className="group relative -mt-px h-[350px] w-full overflow-hidden border border-[#2c2c2c] md:h-[350px] lg:mt-0 lg:h-[400px] lg:w-[620px] lg:-ml-px transition-colors duration-300">
              <div className="relative z-10 p-1 px-5 pt-6">
                <h3 className="text-2xl text-white leading-[1.2]">Future-Ready Architecture</h3>
              </div>
              <div className="absolute inset-0">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                  
                  {/* Floating Box / Constellation SVG Rebuilt */}
                  <svg className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 620 400">
                    <defs>
                      <linearGradient id="cubeTopGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                        <stop offset="26%" stopColor="#c8eeff"></stop>
                        <stop offset="52%" stopColor="#5ab8f5"></stop>
                        <stop offset="76%" stopColor="#1a27d4"></stop>
                      </linearGradient>
                      <linearGradient id="cubeLeftGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(90, 184, 245, 0.3)"></stop>
                        <stop offset="100%" stopColor="rgba(26, 39, 212, 0.15)"></stop>
                      </linearGradient>
                      <linearGradient id="cubeRightGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(200, 238, 255, 0.25)"></stop>
                        <stop offset="100%" stopColor="rgba(90, 184, 245, 0.1)"></stop>
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
                            <text x="-36" y="4" fill="white" fontSize="40" fontWeight="bold" style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.5)"}}>
                              ST
                            </text>
                          </g>
                        </g>
                      </motion.g>
                    </g>
                  </svg>
                  
                  {/* Floating labels under the cube */}
                  <div className="absolute inset-x-0 bottom-24 flex justify-center pb-2">
                    <motion.span 
                      className="font-mono text-[10px] text-[#5ab8f5] uppercase tracking-widest bg-[#1a1a1a] px-3 py-1 border border-[#2c2c2c] rounded-full"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      Softree Cloud
                    </motion.span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 flex h-auto flex-col gap-3 border-[#2c2c2c] border-t bg-[#0a0a0a] group-hover:bg-[#121212] transition-colors duration-300 p-4 md:p-[18px]">
                <p className="max-w-[480px] text-[#ececec] text-sm text-wrap-balance leading-[1.3] opacity-80 md:text-base md:leading-[1.2]">
                  We build scalable, cloud-native solutions that integrate seamlessly with your existing enterprise systems and grow alongside your business.
                </p>
                <a className="flex w-fit items-center justify-center bg-[#1a1a1a] border border-[#2c2c2c] px-4 py-2 transition-all duration-200 hover:bg-[#222] hover:border-[#4a4a4a] hover:scale-[1.02] active:scale-[0.98] rounded-sm" href="#">
                  <span className="font-mono text-xs text-[#a3a3a3] font-semibold leading-normal tracking-widest group-hover:text-white transition-colors">LEARN MORE</span>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
