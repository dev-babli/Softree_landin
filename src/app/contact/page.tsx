import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import GlobalLocations from "./global";
import ContactForm from "./form";
import Certifications from "@/app/services/business-applications/power-apps/certification";
import ContactHero from "./hero";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Softree Technology",
  description:
    "Get in touch with Softree Technology. Let us help you build scalable digital solutions across AI, SharePoint, Power Platform, and modern applications.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#000000] text-white min-h-screen selection:bg-[#38bdf8] selection:text-black overflow-x-hidden">
      <NavigationClient />
      <ContactHero />
      <ContactForm />
      <GlobalLocations />
      <Certifications />
      <Footer />
    </main>
  );
}
