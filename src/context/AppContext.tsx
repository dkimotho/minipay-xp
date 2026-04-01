import { createContext, useState, useCallback, ReactNode } from 'react'

export type XPActionType =
  | 'stake'
  | 'vote'
  | 'delegate'
  | 'transfer'
  | 'app_use'
  | 'name_register'

export interface XPAction {
  id: string
  type: XPActionType
  label: string
  xp: number
  timestamp: Date
}

interface AppContextType {
  toast: string | null
  showToast: (message: string, duration?: number) => void
  activeSheet: string | null
  openSheet: (sheetId: string) => void
  closeSheet: () => void
  claimedRewards: Set<number>
  claimReward: (rewardId: number) => void
  userSeasonalXP: number
  userLifetimeXP: number
  xpActions: XPAction[]
  addXPAction: (action: Omit<XPAction, 'id' | 'timestamp'>) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [toast, setToast] = useState<string | null>(null)
  const [activeSheet, setActiveSheet] = useState<string | null>(null)
  const [claimedRewards, setClaimedRewards] = useState(new Set<number>())
  const [userSeasonalXP, setUserSeasonalXP] = useState(3240)
  const [userLifetimeXP, setUserLifetimeXP] = useState(11820)
  const [xpActions, setXpActions] = useState<XPAction[]>([])

  const showToast = useCallback((message: string, duration = 3000) => {
    setToast(message)
    setTimeout(() => setToast(null), duration)
  }, [])

  const openSheet = useCallback((sheetId: string) => {
    setActiveSheet(sheetId)
  }, [])

  const closeSheet = useCallback(() => {
    setActiveSheet(null)
  }, [])

  const claimReward = useCallback((rewardId: number) => {
    setClaimedRewards((prev) => new Set([...prev, rewardId]))
  }, [])

  const addXPAction = useCallback(
    (action: Omit<XPAction, 'id' | 'timestamp'>) => {
      const newAction: XPAction = {
        ...action,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      }
      setXpActions((prev) => [newAction, ...prev])
      setUserSeasonalXP((prev) => prev + action.xp)
      setUserLifetimeXP((prev) => prev + action.xp)
    },
    [],
  )

  const value: AppContextType = {
    toast,
    showToast,
    activeSheet,
    openSheet,
    closeSheet,
    claimedRewards,
    claimReward,
    userSeasonalXP,
    userLifetimeXP,
    xpActions,
    addXPAction,
  }

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}
