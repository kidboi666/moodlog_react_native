import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IUserStore } from 'src/types/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuid } from 'expo-modules-core';
import { IUserInfo } from '@/types/entries';
import { Nullable } from 'src/types/utils';

export const UserContext = createContext<Nullable<IUserStore>>(null);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    id: '',
    userName: '',
    email: '',
    provider: '',
    age: 0,
    avatarUrl: '',
  });
  const [isInitialUser, setIsInitialUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const savedUserData = await AsyncStorage.getItem('userinfo-storage');
        if (savedUserData) {
          setUserInfo(JSON.parse(savedUserData));
          setIsInitialUser(true);
        }
      } catch (err) {
        console.error('Failed to load user data', err);
      } finally {
        setIsLoading(false);
      }
    };

    void loadUserData();
  }, []);

  const signUp = async (userName: string) => {
    try {
      setIsLoading(true);
      const newUser = {
        ...userInfo,
        id: uuid.v4(),
        userName: userName,
      };
      await AsyncStorage.setItem('userinfo-storage', JSON.stringify(newUser));
      setUserInfo(newUser);
    } catch (err) {
      console.error('Failed to save user data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      isInitialUser,
      signUp,
      userInfo,
      isLoading,
      setIsInitialUser,
    }),
    [isInitialUser, userInfo, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
