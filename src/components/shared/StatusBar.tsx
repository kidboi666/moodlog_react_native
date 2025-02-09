import { StatusBar as RNStatusBar } from 'react-native';
import { useThemeContext } from '@/store/hooks/useThemeContext';

export const StatusBar = () => {
  const { theme } = useThemeContext();
  return (
    <RNStatusBar
      backgroundColor="transparent"
      translucent
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
};
