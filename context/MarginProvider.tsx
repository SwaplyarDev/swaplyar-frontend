'use client';
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
    xs: '5%',
    sm: '10%',
    md: '40px',
    lg: '24px',
    xl: '32px',
  };

  return (
    <MarginContext.Provider value={{ margins }}>
      {children}
    </MarginContext.Provider>
  );
};
