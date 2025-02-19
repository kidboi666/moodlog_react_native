import { Nullable } from '@/types/utils';
import { createContext, PropsWithChildren, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DevContext = createContext<
  Nullable<{
    isUserStorageCleared: boolean;
    onClearUserStorage: () => void;
    isJournalStorageCleared: boolean;
    onClearJournalStorage: () => void;
  }>
>(null);

export const DevContextProvider = ({ children }: PropsWithChildren) => {
  if (!__DEV__) return children;
  const [isUserStorageCleared, setIsStorageCleared] = useState(false);
  const [isJournalStorageCleared, setIsJournalStorageCleared] = useState(false);

  const handleClearUserStorage = async () => {
    console.log('Clearing user storage...');
    await AsyncStorage.removeItem('userinfo-storage');
    setIsStorageCleared(true);
  };

  const handleClearJournalStorage = async () => {
    console.log('Clearing journal storage...');
    await AsyncStorage.removeItem('journal-storage');
    setIsJournalStorageCleared(true);
  };

  return (
    <DevContext.Provider
      value={{
        isUserStorageCleared,
        onClearUserStorage: handleClearUserStorage,
        isJournalStorageCleared,
        onClearJournalStorage: handleClearJournalStorage,
      }}
    >
      {children}
    </DevContext.Provider>
  );
};
