"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string | null
  connect: () => Promise<void>
  disconnect: () => void
  switchNetwork: (chainId: number) => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  const connect = useCallback(async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)

          // Get balance
          const balanceWei = await window.ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          })
          const balanceEth = (Number.parseInt(balanceWei, 16) / 1e18).toFixed(4)
          setBalance(balanceEth)

          // Listen for account changes
          window.ethereum.on("accountsChanged", (newAccounts: string[]) => {
            if (newAccounts.length === 0) {
              disconnect()
            } else {
              setAddress(newAccounts[0])
            }
          })

          // Listen for chain changes
          window.ethereum.on("chainChanged", () => {
            window.location.reload()
          })
        }
      } else {
        alert("Please install MetaMask to use this app")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }, [])

  const disconnect = useCallback(() => {
    setIsConnected(false)
    setAddress(null)
    setBalance(null)
  }, [])

  const switchNetwork = useCallback(async (chainId: number) => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        })
      }
    } catch (error) {
      console.error("Failed to switch network:", error)
    }
  }, [])

  return (
    <WalletContext.Provider value={{ isConnected, address, balance, connect, disconnect, switchNetwork }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
