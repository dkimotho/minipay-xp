import { useAccount } from 'wagmi'

export function useWallet() {
  const { address, isConnected, isConnecting, chainId } = useAccount()
  return {
    address,
    isConnected,
    isConnecting,
    chainId,
    displayAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null,
  }
}
