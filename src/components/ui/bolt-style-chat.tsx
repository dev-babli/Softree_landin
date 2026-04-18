"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideSend, LucideSparkles, LucideTerminal, LucideCheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  status?: 'typing' | 'done'
}

interface BoltStyleChatProps {
  standalone?: boolean
  title?: string
  className?: string
}

export function BoltStyleChat({ standalone = true, title = "Intelligence", className }: BoltStyleChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Neural pipeline initialized. How can I assist with your deployment today?", status: 'done' }
  ])
  const [isTyping, setIsTyping] = useState(false)

  // Simulation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, 
        { id: '2', role: 'user', content: "Optimize edge latency for AWS-EAST-1.", status: 'done' }
      ])
      
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          setMessages(prev => [...prev, 
            { id: '3', role: 'assistant', content: "Analyzing cluster topography... Optimized! Latency reduced by 14.2ms.", status: 'done' }
          ])
        }, 2000)
      }, 1000)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={cn(
      "flex flex-col h-full w-full bg-[#050505] text-white/90 font-sans overflow-hidden border border-white/5 shadow-2xl rounded-2xl",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/5">
        <div className="flex items-center gap-2">
          <LucideSparkles className="text-orange-500" size={16} />
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/50">{title}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/20" />
          <div className="w-2 h-2 rounded-full bg-orange-500/20" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex flex-col max-w-[85%] gap-1",
                msg.role === 'user' ? "ml-auto items-end" : "items-start"
              )}
            >
              <div className={cn(
                "px-3 py-2 rounded-2xl text-[11px] leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-white/10 text-white rounded-tr-none border border-white/10" 
                  : "bg-orange-500/10 text-orange-100 rounded-tl-none border border-orange-500/20"
              )}>
                {msg.content}
              </div>
              {msg.role === 'assistant' && msg.status === 'done' && (
                <div className="flex items-center gap-1 mt-0.5 ml-1">
                   <LucideCheckCircle2 size={8} className="text-emerald-500" />
                   <span className="text-[7px] text-white/20 uppercase font-mono">Verified</span>
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 ml-1"
            >
              <div className="flex gap-1">
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 rounded-full bg-orange-500" />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 rounded-full bg-orange-500" />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 rounded-full bg-orange-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Placeholder */}
      <div className="p-3 bg-white/[0.02] border-t border-white/5 mt-auto">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 relative group">
           <LucideTerminal size={12} className="text-white/20 group-hover:text-orange-500 transition-colors" />
           <span className="text-[10px] text-white/20 flex-1">Ask anything...</span>
           <div className="p-1 px-1.5 rounded-md bg-white/5 border border-white/10">
              <LucideSend size={10} className="text-white/40" />
           </div>
        </div>
      </div>
    </div>
  )
}
