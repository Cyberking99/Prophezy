import { cookieStorage, createStorage } from "wagmi"
import { bsc, bscTestnet, celo, celoAlfajores } from "wagmi/chains"
import { http } from "viem"

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ""

if (!projectId) {
  console.warn("NEXT_PUBLIC_PROJECT_ID is not set")
}

export const networks = [bsc, bscTestnet, celo, celoAlfajores] as const

export const wagmiConfig = {
  chains: networks,
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
}

export const metadata = {
  name: "Prophezy",
  description: "Social Prediction Markets on BNB Chain",
  url: "https://prophezy.app",
  icons: ["https://prophezy.app/icon.png"],
}
