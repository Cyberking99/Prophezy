"use client"

import { MarketCard } from "@/components/market-card"

// Mock data - will be replaced with real data from backend
const mockMarkets = [
  {
    id: "1",
    title: "Will Bitcoin reach $100k by end of 2025?",
    description: "Predict if Bitcoin will hit $100,000 USD",
    category: "Crypto",
    yesPrice: 0.65,
    noPrice: 0.35,
    volume: 125000,
    participants: 1234,
    endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    image: "/bitcoin-chart.png",
  },
  {
    id: "2",
    title: "Will AI regulation pass in 2025?",
    description: "Predict if major AI regulation will be enacted",
    category: "Politics",
    yesPrice: 0.58,
    noPrice: 0.42,
    volume: 89000,
    participants: 856,
    endsAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    image: "/ai-technology-concept.png",
  },
  {
    id: "3",
    title: "Will the S&P 500 close above 6000?",
    description: "Predict if S&P 500 will reach 6000 points",
    category: "Finance",
    yesPrice: 0.72,
    noPrice: 0.28,
    volume: 234000,
    participants: 2156,
    endsAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    image: "/stock-market-analysis.png",
  },
  {
    id: "4",
    title: "Will a new Layer 2 blockchain launch?",
    description: "Predict if a major new L2 will launch this quarter",
    category: "Crypto",
    yesPrice: 0.61,
    noPrice: 0.39,
    volume: 67000,
    participants: 543,
    endsAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    image: "/blockchain-network.png",
  },
  {
    id: "5",
    title: "Will Tesla stock outperform the market?",
    description: "Predict if TSLA will beat S&P 500 returns",
    category: "Stocks",
    yesPrice: 0.54,
    noPrice: 0.46,
    volume: 156000,
    participants: 1876,
    endsAt: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    image: "/tesla-electric-car.jpg",
  },
  {
    id: "6",
    title: "Will the Fed cut rates again?",
    description: "Predict if the Federal Reserve will cut rates next quarter",
    category: "Economics",
    yesPrice: 0.68,
    noPrice: 0.32,
    volume: 198000,
    participants: 2234,
    endsAt: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
    image: "/federal-reserve-building.png",
  },
]

export function MarketGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Active Markets</h2>
          <p className="text-muted-foreground">Trade on the outcomes that matter most</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </div>
    </section>
  )
}
