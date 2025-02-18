import { StatusBar as RNStatusBar } from 'react-native';
import { useAppTheme } from '@/store/hooks/useAppTheme';

export const StatusBar = () => {
  const { currentTheme } = useAppTheme();
  return (
    <RNStatusBar
      backgroundColor="transparent"
      translucent
      barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
};
