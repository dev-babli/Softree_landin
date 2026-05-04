import FizensHeroExact from "@/components/fizens-clone/FizensHeroExact";
import FizensAboutExact from "@/components/fizens-clone/sections/FizensAboutExact";
import "@/components/fizens-clone/framer-original.css";

export default function FizensClonePage() {
  return (
    <main className="min-h-screen bg-white">
      <FizensHeroExact />
      <FizensAboutExact />
    </main>
  );
}
