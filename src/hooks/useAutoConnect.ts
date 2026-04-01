import { useEffect, useState } from 'react'
import { useConnect, useConnectors } from 'wagmi'

export function useAutoConnect() {
  const connectors = useConnectors()
  const { connect, error, isPending } = useConnect()
  const [hasAttempted, setHasAttempted] = useState(false)

  useEffect(() => {
    if (hasAttempted || connectors.length === 0) return
    const attempt = async () => {
      try {
        await connect({ connector: connectors[0] })
      } catch (err) {
        console.error('Auto-connect failed:', err)
      }
      setHasAttempted(true)
    }
    attempt()
  }, [connectors, connect, hasAttempted])

  return { error, isPending }
}
