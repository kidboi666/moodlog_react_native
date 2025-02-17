import { useContext } from 'react';
import { BottomModalContext } from '@/store/contexts/BottomModalContext';

export const useBottomModalContext = () => {
  const context = useContext(BottomModalContext);
  if (!context) {
    throw new Error(
      'useBottomModalContext must be used within a BottomModalContextProvider',
    );
  }
  return context;
};
