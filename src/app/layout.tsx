import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { LenisProvider } from "@/components/providers/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://softree.in"),
  title: {
    default: "Softree Technology — Enterprise Digital Solutions",
    template: "%s · Softree Technology",
  },
  description:
    "Softree builds AI-powered platforms, web applications, Microsoft 365 ecosystems, and data products for ambitious enterprise teams.",
  keywords: [
    "Softree",
    "AI automation",
    "enterprise software",
    "Microsoft 365",
    "Power Platform",
    "web development",
    "data analytics",
    "digital workspace",
  ],
  authors: [{ name: "Softree Technology" }],
  creator: "Softree Technology",
  publisher: "Softree Technology",
  applicationName: "Softree",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Softree Technology",
    title: "Softree Technology — Enterprise Digital Solutions",
    description:
      "AI-powered platforms, web applications, Microsoft 365 ecosystems, and data products for ambitious enterprise teams.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology — Enterprise Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Softree Technology — Enterprise Digital Solutions",
    description:
      "AI-powered platforms, web applications, Microsoft 365 ecosystems, and data products for ambitious enterprise teams.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      {/* ✅ GTM Script (HEAD equivalent in Next.js) */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KDMTPWS8');
          `,
        }}
      />

      <body className="antialiased bg-[#F3F0EE] text-[#0E0E0F]">
        {/* Organization JSON-LD — for AI search engines and Google Knowledge Panel */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Softree Technology",
              alternateName: "Softree",
              url: "https://softree.in",
              logo: "https://softree.in/og-image.png",
              description:
                "Softree builds production-grade software for ambitious enterprise teams. AI agents, web apps, Microsoft 365 ecosystems, and data products.",
              foundingDate: "2020",
              email: "hello@softree.com",
              areaServed: "Worldwide",
              knowsAbout: [
                "Artificial Intelligence",
                "Agentic AI",
                "Generative AI",
                "Microsoft Power Platform",
                "Microsoft 365",
                "Power Apps",
                "Power BI",
                "Microsoft Fabric",
                "SharePoint",
                "Web Application Development",
                "Mobile Application Development",
                "Enterprise Software",
              ],
              sameAs: [
                "https://www.linkedin.com/company/softree-technology",
              ],
            }),
          }}
        />
        {/* WebSite JSON-LD — enables sitelinks search box */}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Softree Technology",
              url: "https://softree.in",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://softree.in/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* ✅ GTM NoScript (IMPORTANT - must be first inside body) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDMTPWS8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Dev/preview tooling — only in development to keep production bundle clean */}
        {process.env.NODE_ENV === "development" && (
          <>
            <Script
              id="orchids-browser-logs"
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
              strategy="afterInteractive"
              data-orchids-project-id="f9231059-3647-4f7a-ab8a-965fcb6abfb0"
            />
            <ErrorReporter />
            <Script
              id="route-messenger"
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/route-messenger.js"
              strategy="afterInteractive"
              data-target-origin="*"
              data-message-type="ROUTE_CHANGE"
              data-include-search-params="true"
              data-only-in-iframe="true"
              data-debug="true"
              data-custom-data='{"appName":"Softree","version":"1.0.0"}'
            />
          </>
        )}
        <LenisProvider>{children}</LenisProvider>
        {/* Visual editor bridge — dev only */}
        {process.env.NODE_ENV === "development" && <VisualEditsMessenger />}
      </body>
    </html>
  );
}
