"use client";

import React, { createContext, useContext, useState } from "react";

interface BalanceProviderProps {
  children: React.ReactNode;
}

// Create a context for the balance
const BalanceContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>] | undefined
>(undefined);

// Create a provider component for the balance context
export const BalanceProvider: React.FC<BalanceProviderProps> = ({
  children,
}) => {
  const [balance, setBalance] = useState(0);
  return (
    <BalanceContext.Provider value={[balance, setBalance]}>
      {children}
    </BalanceContext.Provider>
  );
};

// Create a custom hook to use the balance context
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};
