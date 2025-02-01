import { ITheme } from '@/types/entries';
import { useColorScheme } from 'react-native';

export const useTheme = (): ITheme => {
  const isDarkMode = useColorScheme() === 'dark';

  return {
    isDarkMode,
    colors: {
      background: {
        backgroundColor: isDarkMode ? '#000' : '#fff',
      },
      text: {
        color: isDarkMode ? '#fff' : '#000',
      },
    },
    barStyle: isDarkMode ? 'light-content' : 'dark-content',
  };
};
