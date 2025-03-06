import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { Journal } from '@/types/entries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@/constants/storage';
import { useToastController } from '@tamagui/toast';
import { Nullable } from '@/types/utils';
import { StorageStore } from '@/types/store';

// TODO any
export const StorageContext = createContext<Nullable<StorageStore>>(null);

export const StorageProvider = ({ children }: PropsWithChildren) => {
  const toast = useToastController();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadJournals = async () => {
      try {
        setIsLoading(true);
        const savedJournals = await AsyncStorage.getItem(STORAGE_KEY.JOURNALS);
        if (!savedJournals) {
          const backupJournals = await AsyncStorage.getItem(STORAGE_KEY.BACKUP);
          if (backupJournals) {
            setJournals(JSON.parse(backupJournals));
            toast.show('Restored from backup', {
              message: 'Your data has been restored',
            });
            return;
          }
        }

        setJournals(JSON.parse(savedJournals || '[]'));
      } catch (error) {
        console.error('Load error:', error);
        toast.show('Error loading journals', {
          message: 'Please try again later',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
    void loadJournals();
  }, []);

  useEffect(() => {
    const saveJournals = async () => {
      try {
        setIsLoading(true);

        if (!Array.isArray(journals)) return null;

        await AsyncStorage.setItem(
          STORAGE_KEY.JOURNALS,
          JSON.stringify(journals),
        );

        if (journals.length > 0) {
          await AsyncStorage.setItem(
            STORAGE_KEY.BACKUP,
            JSON.stringify(journals),
          );
        }
      } catch (error) {
        const savedJournals = await AsyncStorage.getItem(STORAGE_KEY.JOURNALS);
        if (savedJournals) {
          setJournals(JSON.parse(savedJournals));
        }

        toast.show('Error saving journals', {
          message: 'Your data has been restored',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
    saveJournals();
  }, [journals]);

  return (
    <StorageContext.Provider value={{ journals, setJournals, isLoading }}>
      {children}
    </StorageContext.Provider>
  );
};
