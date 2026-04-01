import { createContext, useState, useCallback } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [activeSheet, setActiveSheet] = useState(null);
  const [claimedRewards, setClaimedRewards] = useState(new Set());

  const showToast = useCallback((message, duration = 3000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  }, []);

  const openSheet = useCallback((sheetId) => {
    setActiveSheet(sheetId);
  }, []);

  const closeSheet = useCallback(() => {
    setActiveSheet(null);
  }, []);

  const claimReward = useCallback((rewardId) => {
    setClaimedRewards((prev) => new Set([...prev, rewardId]));
  }, []);

  const value = {
    toast,
    showToast,
    activeSheet,
    openSheet,
    closeSheet,
    claimedRewards,
    claimReward,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
