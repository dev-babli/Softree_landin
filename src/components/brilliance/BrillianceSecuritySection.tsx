"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, CheckCircle2 } from "lucide-react";
import BorderGlow from "./BorderGlow";

const securityFeatures = [
  {
    icon: Shield,
    title: "SOC 2 Type II",
    description: "Independently audited security controls with continuous monitoring.",
    glowColor: "132, 152, 230", // Blue
    accentColor: "text-[#8498E6]",
    iconBg: "bg-[#8498E6]/10",
  },
  {
    icon: Lock,
    title: "End-to-end encryption",
    description: "AES-256 encryption for data at rest and TLS 1.3 in transit.",
    glowColor: "56, 189, 248", // Sky/Emerald mix
    accentColor: "text-[#38BDF8]",
    iconBg: "bg-[#38BDF8]/10",
  },
  {
    icon: Eye,
    title: "Zero-trust architecture",
    description: "Every request is authenticated and authorized. No exceptions.",
    glowColor: "194, 153, 255", // Indigo/Purple
    accentColor: "text-[#C299FF]",
    iconBg: "bg-[#C299FF]/10",
  },
  {
    icon: FileCheck,
    title: "GDPR & HIPAA",
    description: "Full compliance with data protection and healthcare regulations.",
    glowColor: "255, 107, 0", // Amber/Orange
    accentColor: "text-[#FF6B00]",
    iconBg: "bg-[#FF6B00]/10",
  },
];

const certifications = ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "CCPA", "SOC 2 Type II"];

export const BrillianceSecuritySection = memo(() => {
  return (
    <section className="w-full py-24 md:py-32 wf-surface flex flex-col items-center overflow-hidden">
      {/* Global Style Inject for Outfit Font if not already present */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;900&display=swap');
        .huly-glass-card {
           background: rgba(255, 255, 255, 0.4);
           backdrop-filter: blur(28px) saturate(180%);
           -webkit-backdrop-filter: blur(28px) saturate(180%);
           border: 1px solid rgba(0, 0, 0, 0.05);
           box-shadow: 
              0 14px 40px -10px rgba(0, 0, 0, 0.05),
              inset 0 1px 4px 0 rgba(255, 255, 255, 0.8);
        }
        .huly-glass-badge {
           background: rgba(255, 255, 255, 0.8);
           backdrop-filter: blur(12px);
           -webkit-backdrop-filter: blur(12px);
           border: 1px solid rgba(0, 0, 0, 0.08);
           box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
      `}</style>
      
      <div className="max-w-[1400px] w-full px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* Left Content */}
        <div className="flex-1 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-[#146ef5]" />
              <span className="wf-label text-[#146ef5]">Security Infrastructure</span>
            </div>
            
            <h2 className="text-[48px] md:text-[68px] font-semibold wf-text-primary tracking-[-0.03em] leading-[1.02] mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Trust is<br /> <span className="text-[#1A1A1E]/40">non-negotiable.</span>
            </h2>
            
            <p className="text-[19px] md:text-[21px] wf-text-secondary leading-[1.6] font-medium tracking-tight mb-12 max-w-[540px]">
              Enterprise-grade security isn&apos;t optional. It&apos;s built into every layer of our platform, from infrastructure to application.
            </p>

            {/* Certification Badges */}
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="px-5 py-2.5 huly-glass-badge rounded-full flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-emerald-600" />
                  </div>
                  <span className="text-[13px] font-bold text-[#1A1A1E] tracking-tight">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Feature Cards */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col group"
            >
              <BorderGlow
                edgeSensitivity={80}
                glowColor={feature.glowColor}
                backgroundColor="transparent"
                borderRadius={24}
                glowRadius={100}
                glowIntensity={2}
                coneSpread={45}
                animated={false}
                colors={['#ffffff', `rgb(${feature.glowColor})`]}
                className="transition-all duration-500 ease-out hover:scale-[1.03] rounded-[24px]"
              >
                <div className="p-8 huly-glass-card rounded-[24px] flex flex-col h-full min-h-[300px]">
                  {/* Icon Container - Glass Block */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-black/5 shadow-sm transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 ${feature.iconBg} ${feature.accentColor}`}>
                    <feature.icon size={28} strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-[22px] font-black mb-4 tracking-tighter text-[#1A1A1E] leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-[15px] text-[#3A3A3F] leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    {feature.description}
                  </p>

                  {/* Aesthetic Detail: Small Glow Orb in corner */}
                  <div className={`absolute -bottom-4 -right-4 w-24 h-24 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full bg-[rgb(${feature.glowColor})]`} />
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

BrillianceSecuritySection.displayName = "BrillianceSecuritySection";
