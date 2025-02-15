import { StatusBar as RNStatusBar } from 'react-native';
import { useThemeContext } from '@/store/hooks/useThemeContext';

export const StatusBar = () => {
  const { currentTheme } = useThemeContext();
  return (
    <RNStatusBar
      backgroundColor="transparent"
      translucent
      barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
};
