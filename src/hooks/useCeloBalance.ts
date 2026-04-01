import { useBalance } from 'wagmi'
import { useWallet } from './useWallet'

export function useCeloBalance() {
  const { address } = useWallet()
  const { data, isLoading } = useBalance({
    address,
    query: { enabled: !!address, staleTime: 30000 },
  })
  return {
    raw: data?.value,
    formatted: data ? parseFloat(data.formatted).toFixed(4) : '0.0000',
    isLoading,
  }
}
