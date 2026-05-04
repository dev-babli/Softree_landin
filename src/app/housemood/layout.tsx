import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Housemood | Professional Interior Design Agency",
  description:
    "At Housemood we design stylish, functional interiors that reflect your vision and enhance your space. From homes to commercial projects, we bring creativity and expertise to every detail.",
  icons: {
    icon: "https://framerusercontent.com/images/K7nEBxK66GMILjBvhmE9qH3Qmto.png",
    apple: "https://framerusercontent.com/images/E22YvuXIEa1oQcphHSOCWWSNr9o.png",
  },
  openGraph: {
    title: "Housemood | Professional Interior Design Agency",
    description:
      "At Housemood we design stylish, functional interiors that reflect your vision and enhance your space. From homes to commercial projects, we bring creativity and expertise to every detail.",
    images: ["https://framerusercontent.com/images/JZI8YzJ7valWSxaZ1UxuawgEA.png"],
  },
  other: {
    stylesheet: "/housemood-framer.css",
  },
};

export default function HousemoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="housemood-root bg-white text-black min-h-screen">
      {children}
    </div>
  );
}
