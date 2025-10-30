"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WalletButton } from "@/components/wallet-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            P
          </div>
          <span className="text-xl font-bold text-foreground">Prophezy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/markets" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Markets
          </Link>
          <Link href="/create" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Create
          </Link>
          <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Portfolio
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
