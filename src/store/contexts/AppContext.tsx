import { createContext, PropsWithChildren, useState } from 'react';
import { IAppStore } from 'src/types/store';
import { ViewFontSize } from '@/types/enums';

/**
 * TODO features
 */
export const AppContext = createContext<IAppStore | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [fontSize, setFontSize] = useState<ViewFontSize>(ViewFontSize.SMALL);
  const [language, setLanguage] = useState('en-US');

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
