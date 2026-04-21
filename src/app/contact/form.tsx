"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  ArrowRight, ShieldCheck, Mail, MessageSquare, 
  ChevronDown, CheckCircle2 
} from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

/* ─────────────────────── SCHEMA ─────────────────────── */

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Please provide more details"),
  botcheck: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

/* ─────────────────────── OPTIONS ─────────────────────── */

const SERVICES = [
  "Agentic AI Development",
  "Generative AI Solutions",
  "SharePoint Intranet",
  "Power Platform Apps",
  "Cloud Migration & Azure",
  "Enterprise Software Audits",
  "Other",
];

const BUDGETS = [
  "Under $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k+",
];

/* ─────────────────────── COMPONENTS ─────────────────────── */

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.botcheck) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "62d53c3d-ccdf-4aa6-bacd-aaac1df8c26f",
          ...data,
          subject: `New Lead: ${data.service} - ${data.firstName} ${data.lastName}`,
          from_name: "Softree Contact App",
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-[#000000] z-20 pb-24 px-6 -mt-32 md:-mt-44 font-sans border-t-0">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-full rounded-[24px] overflow-hidden border border-white/10 bg-[#060606] shadow-[0_0_80px_rgba(0,0,0,0.8)] z-30"
          style={{ backdropFilter: "blur(40px)" }}
        >
          {/* Subtle gradient overlay for the card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

          <div className="flex flex-col lg:flex-row relative z-10">
            {/* ─── LEFT: INFO & TRUST ─── */}
            <div className="lg:w-[40%] p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
              
              <div>
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 block">
                  Contact
                </span>
                <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
                  Get in touch
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-sm">
                  Share your project details and our engineering team will craft a tailored solution for your business.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-white/70" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold mb-1">Email</p>
                      <a href="mailto:contact@softreetechnology.com" className="text-sm font-medium text-white/90 hover:text-blue-400 transition-colors">
                        contact@softreetechnology.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-white/70" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold mb-1">Response Time</p>
                      <p className="text-sm font-medium text-white/90">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 text-white/50 mb-4">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">Enterprise Security</span>
                </div>
                <ul className="text-xs text-white/40 space-y-2 flex flex-col gap-1">
                  <li className="flex items-center gap-2">✓ Strict NDA Protection</li>
                  <li className="flex items-center gap-2">✓ ISO 27001 Certified Processes</li>
                  <li className="flex items-center gap-2">✓ SOC 2 Compliant Infrastructure</li>
                </ul>
              </div>
            </div>

            {/* ─── RIGHT: FORM ─── */}
            <div className="lg:w-[60%] p-10 lg:p-14 bg-white/[0.01]">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                  >
                    <CheckCircle2 className="w-20 h-20 text-blue-500" />
                    <div>
                      <h4 className="text-2xl font-semibold text-white mb-2">Message received.</h4>
                      <p className="text-white/50 max-w-sm mx-auto">
                        Our engineering team is reviewing your requirements. We'll be in touch shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    {/* Bot honeypot */}
                    <input type="checkbox" className="hidden" {...register("botcheck")} />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField label="First name *" error={errors.firstName?.message}>
                        <input
                          {...register("firstName")}
                          placeholder="Jane"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </FormField>

                      <FormField label="Last name *" error={errors.lastName?.message}>
                        <input
                          {...register("lastName")}
                          placeholder="Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </FormField>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField label="Work email *" error={errors.email?.message}>
                        <input
                          {...register("email")}
                          placeholder="jane@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </FormField>

                      <FormField label="Phone number" error={errors.phone?.message}>
                        <input
                          {...register("phone")}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </FormField>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField label="Service of interest *" error={errors.service?.message}>
                        <div className="relative">
                          <select
                            {...register("service")}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled className="text-black">Select a service</option>
                            {SERVICES.map((s) => (
                              <option key={s} value={s} className="text-white bg-[#111]">{s}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        </div>
                      </FormField>

                      <FormField label="Project budget" error={errors.budget?.message}>
                        <div className="relative">
                          <select
                            {...register("budget")}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled className="text-black">Select range</option>
                            {BUDGETS.map((b) => (
                              <option key={b} value={b} className="text-white bg-[#111]">{b}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        </div>
                      </FormField>
                    </div>

                    <FormField label="Project details *" error={errors.message?.message}>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Tell us about your technical requirements, goals, and timeline..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                      />
                    </FormField>

                    <div className="pt-2">
                      <BorderGlow
                        edgeSensitivity={80}
                        glowColor="200 80% 80%"
                        backgroundColor="transparent"
                        borderRadius={8}
                        glowRadius={60}
                        glowIntensity={1.5}
                        coneSpread={45}
                        animated={false}
                        colors={['#ffffff', '#8498e6', '#38bdf8']}
                        className="w-full sm:w-auto"
                      >
                         <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
                        >
                          {isSubmitting ? "Sending..." : "Submit inquiry"}
                          {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                      </BorderGlow>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-[12px] font-medium text-white/70 tracking-wide">
          {label}
        </label>
        {error && <span className="text-[11px] text-red-400">{error}</span>}
      </div>
      {children}
    </div>
  );
}
