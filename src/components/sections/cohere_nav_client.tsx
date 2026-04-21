import dynamic from "next/dynamic"

const CohereNav = dynamic(() => import("./cohere_nav"), { ssr: false })

export default function CohereNavClient() {
  return <CohereNav />
}
