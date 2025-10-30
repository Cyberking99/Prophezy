import { Header } from "@/components/header"
import { MarketGrid } from "@/components/market-grid"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <MarketGrid />
    </main>
  )
}
