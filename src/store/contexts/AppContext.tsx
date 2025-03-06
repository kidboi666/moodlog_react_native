import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { AppStore } from 'src/types/store';
import { Languages, ViewFontSize } from 'src/types/enums';
import * as Localization from 'expo-localization';
import { Nullable } from '@/types/utils';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ISODateString } from '@/types/dtos/date';
import { STORAGE_KEY } from '@/constants/storage';
import { APP_VERSION } from '@/constants/common';

export const AppContext = createContext<Nullable<AppStore>>(null);

const defaultLanguage = Localization.getLocales()[0].languageCode as Languages;

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [appVersion] = useState<typeof APP_VERSION>(APP_VERSION);
  const [fontSize, setFontSize] = useState<ViewFontSize>(ViewFontSize.SMALL);
  const [language, setLanguage] = useState<Languages>(defaultLanguage);
  const [isInitialApp, setIsInitialApp] = useState<boolean>(false);
  const [firstLaunchDate, setFirstLaunceDate] =
    useState<Nullable<ISODateString>>(null);
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: Languages) => {
    setLanguage(language);
  };

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

  const initializeFirstLaunchStatus = async () => {
    const firstLaunchDate = new Date()
      .toISOString()
      .split('T')[0] as ISODateString;

    try {
      await AsyncStorage.setItem(STORAGE_KEY.INIT, 'true');
      await AsyncStorage.setItem(STORAGE_KEY.FIRST_LAUNCH, firstLaunchDate);
      setIsInitialApp(true);
      setFirstLaunceDate(firstLaunchDate);
    } catch (err) {
      console.error('초기화 중 오류 발생:', err);
    }

    return firstLaunchDate;
  };

  useEffect(() => {
    if (language) {
      void i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    const loadInitialValue = async () => {
      const isInitialApp = await AsyncStorage.getItem(STORAGE_KEY.INIT);
      const firstLaunchDate = await AsyncStorage.getItem(
        STORAGE_KEY.FIRST_LAUNCH,
      );
      if (isInitialApp === 'true') {
        setIsInitialApp(true);
        setFirstLaunceDate(firstLaunchDate as ISODateString);
      }
    };
    void loadInitialValue();
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        isInitialApp,
        appVersion,
        firstLaunchDate,
        fontSize,
        initializeFirstLaunchStatus,
        onChangeFontSize: handleFontSizeChange,
        onChangeLanguage: handleLanguageChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
