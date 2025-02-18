import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IUserStore } from 'src/types/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfo } from '@/types/dtos/user';
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

  const signUp = async (params: UserInfo) => {
    try {
      setIsLoading(true);
      const newUser = {
        id: uuid.v4(),
        ...params,
      };
      await AsyncStorage.setItem('userinfo-storage', JSON.stringify(newUser));
      setUserInfo(newUser);
      setIsInitialUser(true);
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
    }),
    [isInitialUser, userInfo, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
