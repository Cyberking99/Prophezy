# Reown AppKit Wallet Setup

Your wallet connection has been migrated to use Reown AppKit (formerly WalletConnect).

## Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Get your Project ID:**
   - Visit https://cloud.reown.com
   - Create a new project or use an existing one
   - Copy your Project ID

3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local`
   - Add your Project ID:
     ```
     NEXT_PUBLIC_PROJECT_ID=your_project_id_here
     ```

4. **Run your app:**
   ```bash
   npm run dev
   ```

## What Changed

- **Wallet Provider**: Now uses Reown AppKit with Wagmi adapter
- **Multi-wallet Support**: Users can connect with MetaMask, WalletConnect, Coinbase Wallet, and more
- **Better UX**: Modern wallet connection modal with network switching
- **Type Safety**: Full TypeScript support with Wagmi hooks

## Usage

The `useWallet` hook in `hooks/use-wallet.ts` provides the same interface as before:

```typescript
const { isConnected, address, balance, connect, disconnect, switchNetwork } = useWallet()
```

## Networks

Currently configured for:
- BNB Smart Chain (Mainnet)
- BNB Smart Chain Testnet

You can modify networks in `lib/wagmi-config.ts`.
