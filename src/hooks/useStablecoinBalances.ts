import { useReadContracts } from 'wagmi'
import { erc20Abi, formatUnits } from 'viem'
import { useWallet } from './useWallet'

const TOKENS = {
  USDC: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C',
  USDm: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
  USDT: '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e',
} as const

export function useStablecoinBalances() {
  const { address } = useWallet()

  const contracts = address
    ? Object.entries(TOKENS).flatMap(([, tokenAddress]) => [
        {
          address: tokenAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: 'balanceOf' as const,
          args: [address],
        },
        {
          address: tokenAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: 'decimals' as const,
        },
      ])
    : []

  const { data, isLoading } = useReadContracts({
    contracts: contracts,
    query: { enabled: !!address, staleTime: 30000 },
  })

  const balances = Object.keys(TOKENS).map((symbol, i) => {
    const balance = data?.[i * 2]?.result as bigint | undefined
    const decimals = data?.[i * 2 + 1]?.result as number | undefined
    return {
      symbol,
      balance:
        balance && decimals
          ? parseFloat(formatUnits(balance, decimals)).toFixed(2)
          : '0.00',
    }
  })

  return { balances, isLoading }
}
