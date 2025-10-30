"use client"

import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function WalletButton() {
  const { isConnected, address, connect, disconnect } = useWallet()

  if (!isConnected) {
    return (
      <Button onClick={connect} size="sm" className="bg-primary hover:bg-primary/90">
        Connect Wallet
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 bg-accent">
        <AvatarFallback className="text-accent-foreground font-bold">
          {address?.slice(2, 4).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-foreground">{address?.slice(0, 6)}...</p>
        <p className="text-xs text-muted-foreground">{address?.slice(-4)}</p>
      </div>
      <Button onClick={disconnect} variant="outline" size="sm" className="bg-transparent">
        Disconnect
      </Button>
    </div>
  )
}
