import { useContext } from 'react';
import { BottomModalContext } from '@/store/contexts/BottomModalContext';

export const useBottomModal = () => {
  const context = useContext(BottomModalContext);
  if (!context) {
    throw new Error(
      'useBottomModal must be used within a BottomModalContextProvider',
    );
  }
  return context;
};
