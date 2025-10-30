"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock market data
const mockMarket = {
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
  creator: {
    name: "CryptoAnalyst",
    avatar: "/placeholder.svg",
    verified: true,
  },
  resolutionSource: "CoinMarketCap",
  liquidity: 50000,
  yesShares: 76500,
  noShares: 23500,
}

const mockComments = [
  {
    id: "1",
    author: "BitcoinBull",
    avatar: "/placeholder.svg",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    content: "Bitcoin is definitely going to hit 100k. The fundamentals are strong!",
    likes: 234,
  },
  {
    id: "2",
    author: "CryptoSkeptic",
    avatar: "/placeholder.svg",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    content: "I think this is too optimistic. Market conditions are uncertain.",
    likes: 156,
  },
  {
    id: "3",
    author: "TradingPro",
    avatar: "/placeholder.svg",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    content: "The odds seem fair. I'm taking a position on YES.",
    likes: 89,
  },
]

export function MarketDetail({ marketId }: { marketId: string }) {
  const [predictionAmount, setPredictionAmount] = useState("")
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no">("yes")
  const [showTradeForm, setShowTradeForm] = useState(false)

  const daysLeft = Math.ceil((mockMarket.endsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const totalShares = mockMarket.yesShares + mockMarket.noShares
  const yesPercentage = (mockMarket.yesShares / totalShares) * 100
  const noPercentage = (mockMarket.noShares / totalShares) * 100

  const handleTrade = () => {
    console.log(`Trading ${predictionAmount} on ${selectedOutcome}`)
    setPredictionAmount("")
    setShowTradeForm(false)
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {mockMarket.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{mockMarket.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{mockMarket.description}</p>

          <div className="flex flex-col sm:flex-row gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Created by</span>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mockMarket.creator.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{mockMarket.creator.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{mockMarket.creator.name}</span>
                {mockMarket.creator.verified && <span className="text-accent">✓</span>}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Ends in</span>
              <p className="font-medium text-foreground">{daysLeft} days</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Volume</span>
              <p className="font-medium text-foreground">${mockMarket.volume.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Participants</span>
              <p className="font-medium text-foreground">{mockMarket.participants.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Market image */}
            <Card className="overflow-hidden">
              <div className="relative h-80 w-full bg-muted">
                <Image
                  src={mockMarket.image || "/placeholder.svg"}
                  alt={mockMarket.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>

            {/* Prediction odds */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Current Odds</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">Yes</span>
                    <span className="text-2xl font-bold text-accent">{(mockMarket.yesPrice * 100).toFixed(0)}¢</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div className="bg-accent h-full" style={{ width: `${yesPercentage}%` }} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{yesPercentage.toFixed(1)}% of shares</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">No</span>
                    <span className="text-2xl font-bold text-destructive">
                      {(mockMarket.noPrice * 100).toFixed(0)}¢
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div className="bg-destructive h-full" style={{ width: `${noPercentage}%` }} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{noPercentage.toFixed(1)}% of shares</p>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Market Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Resolution Source</p>
                      <p className="font-medium text-foreground">{mockMarket.resolutionSource}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Liquidity</p>
                      <p className="font-medium text-foreground">${mockMarket.liquidity.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Market Status</p>
                      <p className="font-medium text-foreground">Active</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="mt-6 space-y-4">
                {mockComments.map((comment) => (
                  <Card key={comment.id} className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {Math.floor((Date.now() - comment.timestamp.getTime()) / (1000 * 60 * 60))}h ago
                          </span>
                        </div>
                        <p className="text-foreground mb-2">{comment.content}</p>
                        <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          👍 {comment.likes}
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground">Recent trading activity will appear here</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Trade form */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-foreground mb-6">Place Prediction</h2>

              {!showTradeForm ? (
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setSelectedOutcome("yes")
                      setShowTradeForm(true)
                    }}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Predict Yes
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedOutcome("no")
                      setShowTradeForm(true)
                    }}
                    variant="outline"
                    className="w-full bg-transparent border-destructive text-destructive hover:bg-destructive/10"
                  >
                    Predict No
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Predicting: <span className="font-semibold text-foreground">{selectedOutcome.toUpperCase()}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Price: {selectedOutcome === "yes" ? mockMarket.yesPrice : mockMarket.noPrice} BUSD
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Amount (BUSD)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={predictionAmount}
                      onChange={(e) => setPredictionAmount(e.target.value)}
                      className="bg-card border-border"
                    />
                  </div>

                  {predictionAmount && (
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">You will receive</p>
                      <p className="text-lg font-bold text-foreground">
                        {(
                          Number.parseFloat(predictionAmount) /
                          (selectedOutcome === "yes" ? mockMarket.yesPrice : mockMarket.noPrice)
                        ).toFixed(2)}{" "}
                        shares
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={() => setShowTradeForm(false)} variant="outline" className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                    <Button onClick={handleTrade} className="flex-1 bg-primary hover:bg-primary/90">
                      Confirm
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">Market Info</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Liquidity</span>
                    <span className="font-medium text-foreground">${mockMarket.liquidity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume</span>
                    <span className="font-medium text-foreground">${mockMarket.volume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Traders</span>
                    <span className="font-medium text-foreground">{mockMarket.participants}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
