import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { UserStore } from 'src/types/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uuid } from 'expo-modules-core';
import { UserInfo } from '@/types/entries';
import { Nullable } from 'src/types/utils';
import { STORAGE_KEY } from '@/constants/storage';

export const UserContext = createContext<Nullable<UserStore>>(null);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '',
    userName: '',
    email: '',
    provider: '',
    age: 0,
    avatarUrl: '',
  });
  const [draftUserName, setDraftUserName] = useState<string>('');
  const [isInitialUser, setIsInitialUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUp = async (userName: string) => {
    try {
      setIsLoading(true);
      const newUser = {
        ...userInfo,
        id: uuid.v4(),
        userName: userName,
      };
      await AsyncStorage.setItem(
        STORAGE_KEY.USER_INFO,
        JSON.stringify(newUser),
      );
      setUserInfo(newUser);
      setIsInitialUser(true);
    } catch (err) {
      console.error('Failed to save user data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeDraftUserName = (userName: string) => {
    setDraftUserName(userName);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const savedUserData = await AsyncStorage.getItem(STORAGE_KEY.USER_INFO);
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

  return (
    <UserContext.Provider
      value={{
        isInitialUser,
        signUp,
        userInfo,
        isLoading,
        draftUserName,
        onChangeDraftUserName: handleChangeDraftUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
