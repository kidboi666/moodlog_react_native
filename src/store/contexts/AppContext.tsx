import { createContext, PropsWithChildren, useState } from 'react';
import { IAppStore } from '@/types/interfaces';
import { ViewFontSize } from '@/types/enums';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * TODO features
 */
export const AppContext = createContext<IAppStore | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [fontSize, setFontSize] = useState<ViewFontSize>(ViewFontSize.SMALL);
  const [language, setLanguage] = useState('en-US');
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('has_launched');
      if (hasLaunched === null) {
        setIsFirstLaunch(true);
        await AsyncStorage.setItem('has_launched', 'true');
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.log('Failed to check first launch', error);
      setIsFirstLaunch(false);
    }
  };

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

  return (
    <AppContext.Provider
      value={{
        fontSize,
        language,
        onChangeFontSize: handleFontSizeChange,
        checkFirstLaunch,
        setIsFirstLaunch,
        isFirstLaunch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
