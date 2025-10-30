"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Market {
  id: string
  title: string
  description: string
  category: string
  yesPrice: number
  noPrice: number
  volume: number
  participants: number
  endsAt: Date
  image: string
}

export function MarketCard({ market }: { market: Market }) {
  const daysLeft = Math.ceil((market.endsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <Link href={`/market/${market.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <div className="relative h-40 w-full bg-muted overflow-hidden">
          <Image src={market.image || "/placeholder.svg"} alt={market.title} fill className="object-cover" />
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              {market.category}
            </span>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <h3 className="font-bold text-foreground mb-2 line-clamp-2">{market.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{market.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
            <div className="bg-accent/10 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Yes</div>
              <div className="text-lg font-bold text-accent">{(market.yesPrice * 100).toFixed(0)}¢</div>
            </div>
            <div className="bg-destructive/10 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">No</div>
              <div className="text-lg font-bold text-destructive">{(market.noPrice * 100).toFixed(0)}¢</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 pb-3 border-t border-border">
            <span>{market.participants.toLocaleString()} traders</span>
            <span>{daysLeft}d left</span>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90">Trade Now</Button>
        </div>
      </Card>
    </Link>
  )
}
