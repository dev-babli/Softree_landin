"use client";

import dynamic from "next/dynamic";

const CohereNav = dynamic(() => import("./CohereNav"), {
  ssr: false,
});

export default function CohereNavClient() {
  return <CohereNav />;
}
