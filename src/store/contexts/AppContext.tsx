import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { AppStore } from 'src/types/store';
import { Languages, ViewFontSize } from 'src/types/enums';
import * as Localization from 'expo-localization';
import { Nullable } from '@/types/utils';
import { useTranslation } from 'react-i18next';

/**
 * TODO features
 */
export const AppContext = createContext<Nullable<AppStore>>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const defaultLanguage = Localization.getLocales()[0]
    .languageCode as Languages;
  const [fontSize, setFontSize] = useState<ViewFontSize>(ViewFontSize.SMALL);
  const [language, setLanguage] = useState<Languages>(defaultLanguage);
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: Languages) => {
    setLanguage(language);
  };

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

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
