import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Fizens - The Ultimate Finance SAAS Framer Template",
  description:
    "A methodology used by veteran Framer users to 10x their build time, create more structured and cleaner projects with guaranteed responsiveness.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function FizensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
