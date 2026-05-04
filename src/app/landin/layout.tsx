import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landin - Premium Agency & Landing Page",
  description:
    "Landin is a premium agency and landing page template, perfect for showcasing your brand with a sleek, modern design, responsive layouts, and easy customization.",
  icons: {
    icon: [
      {
        url: "https://framerusercontent.com/sites/icons/default-favicon-light.v1.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://framerusercontent.com/sites/icons/default-favicon-dark.v1.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "https://framerusercontent.com/sites/icons/default-touch-icon.v3.png",
  },
  openGraph: {
    type: "website",
    title: "Landin - Premium Agency & Landing Page",
    description:
      "Landin is a premium agency and landing page template, perfect for showcasing your brand with a sleek, modern design, responsive layouts, and easy customization.",
    images: ["https://framerusercontent.com/images/eB4kLBCFbohpyEjQGutHBTMViQ.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landin - Premium Agency & Landing Page",
    description:
      "Landin is a premium agency and landing page template, perfect for showcasing your brand with a sleek, modern design, responsive layouts, and easy customization.",
    images: ["https://framerusercontent.com/images/eB4kLBCFbohpyEjQGutHBTMViQ.png"],
  },
};

export default function LandinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lenis-root">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {children}
    </div>
  );
}
