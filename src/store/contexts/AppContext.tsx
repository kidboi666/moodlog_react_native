import { createContext, PropsWithChildren, useState } from 'react';
import { AppStore } from 'src/types/store';
import { ViewFontSize } from '@/types/enums';
import * as Localization from 'expo-localization';
import { Nullable } from '@/types/utils';

/**
 * TODO features
 */
export const AppContext = createContext<Nullable<AppStore>>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const defaultLanguage = Localization.getLocales()[0].languageCode;
  const [fontSize, setFontSize] = useState<ViewFontSize>(ViewFontSize.SMALL);
  const [language, setLanguage] = useState(defaultLanguage);

  const handleLanguageChange = (language: any) => {
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

  return (
    <AppContext.Provider
      value={{
        fontSize,
        language,
        onChangeFontSize: handleFontSizeChange,
        onChangeLanguage: handleLanguageChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
