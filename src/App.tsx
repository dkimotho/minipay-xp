import { Suspense, lazy } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { config } from './lib/wagmi'
import { AppErrorBoundary } from './components/layout/AppErrorBoundary'
import { PageSkeleton } from './components/layout/PageSkeleton'
import { Toast } from './components/layout/Toast'
import { useAutoConnect } from './hooks/useAutoConnect'

// Lazy load all pages
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })))
const Staking = lazy(() => import('./pages/Staking').then(m => ({ default: m.Staking })))
const Governance = lazy(() => import('./pages/Governance').then(m => ({ default: m.Governance })))
const Delegation = lazy(() => import('./pages/Delegation').then(m => ({ default: m.Delegation })))
const Discover = lazy(() => import('./pages/Discover').then(m => ({ default: m.Discover })))
const Rewards = lazy(() => import('./pages/Rewards').then(m => ({ default: m.Rewards })))

const queryClient = new QueryClient()

function AppContent() {
  const { isPending } = useAutoConnect()

  if (typeof window === 'undefined' || !window.ethereum) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
        <p>Open this app from MiniPay to connect your wallet.</p>
      </div>
    )
  }

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        background: '#35D07F', color: '#0A0A0A',
        padding: '8px', textAlign: 'center',
        fontSize: '12px', zIndex: 9999, fontWeight: 'bold'
      }}>
        ✓ MiniPay XP loaded correctly
      </div>
      <div className="flex h-screen bg-bg-primary overflow-hidden" style={{ marginTop: '32px' }}>
        <div className="w-full max-w-md mx-auto flex flex-col flex-1">
        <div className="flex-1 overflow-hidden flex flex-col">
          <Suspense fallback={<PageSkeleton />}>
            <HashRouter>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/staking" element={<Staking />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/delegation" element={<Delegation />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </HashRouter>
          </Suspense>
        </div>
        <Toast />
      </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <AppErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </WagmiProvider>
    </AppErrorBoundary>
  )
}
