import { Nullable } from '@/types/utils';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/constants/storage';
import { dummyJournals } from '../../../dummy';

export const DevContext = createContext<
  Nullable<{
    onClearUserStorage: () => void;
    onClearJournalStorage: () => void;
    onClearStorage: () => void;
    insertDummyData: () => void;
    onClearStatsStorage: () => void;
  }>
>(null);

export const DevContextProvider = ({ children }: PropsWithChildren) => {
  if (!__DEV__) return children;
  const [isStorageCleared, setIsStorageCleared] = useState(false);

  const handleClearUserStorage = async () => {
    console.log('Clearing user storage...');
    await AsyncStorage.removeItem(STORAGE_KEY.USER_INFO);
    setIsStorageCleared(true);
  };

  const handleClearJournalStorage = async () => {
    console.log('Clearing (journal) storage...');
    await AsyncStorage.removeItem(STORAGE_KEY.JOURNALS);
    setIsStorageCleared(true);
  };

  const handleClearStorage = async () => {
    console.log('Clearing storage...');
    await AsyncStorage.clear();
    setIsStorageCleared(true);
  };

  const insertDummyData = async () => {
    console.log('Inserting dummy data...');
    await AsyncStorage.setItem(
      STORAGE_KEY.JOURNALS,
      JSON.stringify(dummyJournals),
    );
  };

  const handleClearStatsStorage = async () => {
    console.log('Clearing stats storage...');
    await AsyncStorage.removeItem(STORAGE_KEY.EMOTION_STATS);
    await AsyncStorage.removeItem(STORAGE_KEY.JOURNALS_STATS);
    setIsStorageCleared(true);
  };

  useEffect(() => {}, [isStorageCleared]);

  return (
    <DevContext.Provider
      value={{
        onClearUserStorage: handleClearUserStorage,
        onClearJournalStorage: handleClearJournalStorage,
        onClearStorage: handleClearStorage,
        onClearStatsStorage: handleClearStatsStorage,
        insertDummyData,
      }}
    >
      {children}
    </DevContext.Provider>
  );
};
