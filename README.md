# MiniPay XP — Production Prototype

A React + Vite prototype for MiniPay XP, the activity, rewards, and discovery layer for the MiniPay mini app ecosystem on the Celo blockchain.

## Features

### Core Pages
- **Dashboard**: Live wallet connection, CELO balance, XP tracking, weekly activity chart, recent activity feed
- **Staking**: Browse validators, stake CELO with live APY rates, track rewards
- **Governance**: Vote on Celo proposals, view proposal details and voting power
- **Delegation**: Delegate governance votes to trusted delegates or custom addresses
- **Discover**: Browse mini apps by category, filter by DeFi/Payments/Rewards, Celo Names integration
- **Rewards**: Claim earned rewards, view season tier, prize pool breakdown, past seasons

### Gamification
- Seasonal & Lifetime XP tracking
- XP awards for staking (+150 XP), voting (+75 XP), delegation (+100 XP), and more
- Real-time leaderboard with rank deltas
- Tier-based reward distribution
- Activity feed with animated XP notifications

### Blockchain Integration
- Auto-connect via `window.ethereum` (MiniPay injection)
- Live CELO balance from wagmi `useBalance`
- ERC-20 stablecoin balances (USDC, USDm, USDT)
- Error boundary with graceful fallbacks
- Wallet provider detection and guards

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS v4** with custom dark theme
- **Wagmi v2** + **Viem** for blockchain
- **React Router v7** for navigation
- **Recharts** for analytics charts
- **Lucide React** for icons
- **TanStack React Query** for data fetching

## Getting Started

```bash
npm install
npm run dev      # Start dev server on http://localhost:5173
npm run build    # Production build (104KB gzipped)
```

## MiniPay Optimization

### Viewport & Mobile
- Fixed meta viewport for MiniPay WebView
- Bottom sticky navigation (no fixed positioning)
- Min-height 100dvh for dynamic viewport
- Touch targets ≥44px
- Text sizes ≥13px

### Performance
- Pages lazy-loaded with Suspense + PageSkeleton
- Bundle: 104KB gzipped (well under 200KB limit)
- Contract reads have 30s stale time
- No blocking requests on page load

### Auto-Connect Pattern
```typescript
// MiniPay injects window.ethereum automatically
// App auto-connects via useAutoConnect hook
// No "Connect Wallet" button needed
```

## XP System

**Awards:**
| Action | XP |
|--------|----|
| Stake CELO | +150 |
| Vote on governance | +75 |
| Delegate votes | +100 |
| Register Celo Name | +200 |
| Mini app transaction | +50 |
| Money transfer | +25 |

## Development

```bash
npm run dev      # Vite dev server
npm run build    # Optimize bundle
npm run lint     # ESLint check
npm run preview  # Preview production build
```

Test in MiniPay via ngrok:
```bash
npm run dev
# Terminal 2:
ngrok http 5173
# Open ngrok URL in MiniPay
```

## Bundle Size

- Production gzipped: **104KB**
- Main chunk: **94KB**
- Lazy page chunks: **1.4-2.9KB** each
- Meets MiniPay <200KB requirement

## Architecture

- **Pages lazy-loaded** for faster initial load
- **Context-based XP tracking** persists during session
- **Wagmi for wallet state** with auto-connect on mount
- **Error boundary** catches crashes gracefully
- **Toast system** for notifications without blocking UI
