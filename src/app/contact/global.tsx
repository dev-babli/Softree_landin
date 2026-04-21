"use client";

import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import CompanyLocationsGlobe from "@/components/ui/company-locations-globe";

const locations = [
  {
    title: "Cuttack",
    badge: "HQ",
    address: "PLOT 5C/1283, SECTOR-10, CDA Cuttack, Odisha 753014",
    phone: "+91 91786 65408",
    mail: "soumyap@softreetechnology.com",
    salesPerson: "Soumya P.",
    mapUrl: "https://www.google.com/maps?q=CDA%20Sector%2010%20Cuttack%20Odisha",
    accent: "#38bdf8",
  },
  {
    title: "Bengaluru",
    address: "Flat no. B308, Kempapura, Bengaluru, 560037",
    phone: "+91 90404 92078",
    mail: "shradhab@softreetechnology.com",
    salesPerson: "Shradha B.",
    mapUrl: "https://www.google.com/maps?q=Kempapura%20Bengaluru%20India",
    accent: "#c299ff",
  },
  {
    title: "San Francisco",
    address: "166 Geary St. STE 1500 #2439, San Francisco, CA 94108",
    phone: "+1 628-800-5447",
    mail: "sophie.lynn@softreetechnology.com",
    salesPerson: "Sophie L.",
    mapUrl: "https://www.google.com/maps?q=166+Geary+St+STE+1500+San+Francisco+CA+94108+USA",
    accent: "#8498e6",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function GlobalLocations() {
  return (
    <section id="locations" className="relative w-full bg-[#000000] text-white py-32 overflow-hidden border-t border-white/5">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side: Globe */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full aspect-square flex items-center justify-center order-2 lg:order-1"
        >
          {/* Faint grid background behind globe */}
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714558602/grid_bg_dark_xszwvw.png')] bg-center bg-cover opacity-[0.15] mix-blend-screen pointer-events-none" />
          <CompanyLocationsGlobe className="w-full h-full scale-[1.2] md:scale-[1.4]" />
        </motion.div>

        {/* Right side: Locations Data */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Our Global Offices
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/50 text-lg max-w-md"
            >
              Strategically located across two continents to provide 24/7 support and localized expertise for your enterprise.
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            {locations.map((loc) => (
              <motion.div
                key={loc.title}
                variants={item}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20"
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 150px at center, ${loc.accent}15, transparent)`
                  }}
                />

                <div className="flex-1 space-y-3 z-10">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-medium text-white/90">{loc.title}</h3>
                    {loc.badge && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-white/10 text-white/80 border border-white/10"
                      >
                        {loc.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                    {loc.address}
                  </p>
                </div>

                <div className="flex flex-col space-y-2 z-10">
                  <a
                    href={`tel:${loc.phone}`}
                    className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 text-white/40" />
                    {loc.phone}
                  </a>
                  <a
                    href={`mailto:${loc.mail}`}
                    className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4 text-white/40" />
                    <span className="truncate max-w-[200px]">{loc.mail}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
