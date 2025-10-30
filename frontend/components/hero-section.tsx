import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Predict the Future, Trade with Confidence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
            Create and trade on prediction markets. Earn rewards for accurate predictions on BNB Chain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/markets">
              <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                Explore Markets
              </Button>
            </Link>
            <Link href="/create">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Create Market
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
