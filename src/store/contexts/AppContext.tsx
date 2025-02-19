import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { IAppStore } from 'src/types/store';
import { ViewFontSize } from '@/types/enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Nullable } from '@/types/utils';

/**
 * TODO features
 */
export const AppContext = createContext<Nullable<IAppStore>>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [fontSize, setFontSize] = useState<ViewFontSize>(ViewFontSize.SMALL);
  const [language, setLanguage] = useState('en-US');
  const [users, setUsers] = useState([]);

  const handleLanguageChange = (language: any) => {};

  const handleFontSizeChange = () => {
    switch (fontSize) {
      case ViewFontSize.MEDIUM:
        setFontSize(ViewFontSize.LARGE);
        break;
      case ViewFontSize.LARGE:
        setFontSize(ViewFontSize.SMALL);
        break;
      case ViewFontSize.SMALL:
        setFontSize(ViewFontSize.MEDIUM);
        break;
      default:
        break;
    }
  };

  const removeUser = async () => {
    await AsyncStorage.removeItem('userinfo-storage');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await AsyncStorage.getItem('userinfo-storage');
      if (users) {
        setUsers(JSON.parse(users));
      }
    };

    void fetchUsers();
  }, []);

  return (
    <AppContext.Provider
      value={{
        fontSize,
        removeUser,
        language,
        users,
        onChangeFontSize: handleFontSizeChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
