import React, { createContext, useContext } from 'react';
import { TPostingAs } from '../core/types';
import { TEventEmitter } from './eventEmitter';
import { useSocket } from './useSocket';

type TAppContext = {
  postingAs: TPostingAs;
  performDiceRoll: ReturnType<typeof useSocket>['performDiceRoll'];
  onPerformDiceRoll: TEventEmitter;
};

const AppContext = createContext<TAppContext | null>(null);

export interface AppProviderProps extends TAppContext {
  children: React.ReactNode;
}

export const AppProvider = ({ children, ...value }: AppProviderProps) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};