import BankingBeyondMorphSection from "@/components/banking-beyond/BankingBeyondMorphSection";

export const metadata = {
  title: "Banking & Beyond — Softree",
  description: "Pinned scroll-morph hero recreating the Revolut Banking & Beyond → Your salary, reimagined sequence.",
};

export default function BankingBeyondPage() {
  return (
    <main className="relative bg-white">
      <BankingBeyondMorphSection />
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Join 70+ million customers worldwide and 13 million in the UK
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-zinc-600">
            (Next section placeholder — proves the pinned animation releases cleanly and the page continues to scroll.)
          </p>
        </div>
      </section>
    </main>
  );
}
