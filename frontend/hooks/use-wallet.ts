"use client"

import { useAccount, useBalance, useDisconnect, useSwitchChain } from "wagmi"
import { useAppKit } from "@reown/appkit/react"

export function useWallet() {
  const { open } = useAppKit()
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const { data: balanceData } = useBalance({
    address: address,
  })

  const connect = async () => {
    await open()
  }

  const switchNetwork = async (chainId: number) => {
    switchChain({ chainId })
  }

  return {
    isConnected,
    address: address || null,
    balance: balanceData ? Number(balanceData.formatted).toFixed(4) : null,
    chainId: chain?.id,
    connect,
    disconnect,
    switchNetwork,
  }
}
