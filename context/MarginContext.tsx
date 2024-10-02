'use client'
import React, { createContext, useContext, ReactNode } from 'react';

interface MarginContextProps {
  margins: { [key: string]: string };
}

const MarginContext = createContext<MarginContextProps | undefined>(undefined);

export const useMargins = () => {
  const context = useContext(MarginContext);
  if (!context) {
    throw new Error('useMargins must be used within a MarginProvider');
  }
  return context;
};

interface MarginProviderProps {
  children: ReactNode;
}

export const MarginProvider: React.FC<MarginProviderProps> = ({ children }) => {

  const margins = {
    xs: '8px',   
    sm: '12px',  
    md: '16px', 
    lg: '24px',  
    xl: '32px',  
  };

  return (
    <MarginContext.Provider value={{ margins }}>
      {children}
    </MarginContext.Provider>
  );
};
