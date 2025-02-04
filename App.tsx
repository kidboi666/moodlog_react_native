import { ThemedStatusBar } from '@/components/common/ThemedStatusBar';
import { RootNavigator } from '@/navigation';
import { useThemeCtx } from '@/store/context/useThemeCtx';
import ContextProvider from '@/store/provider/contextProvider';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider, Theme } from 'tamagui';
import { config } from './tamagui.config';

const AppContent = () => {
  const { theme } = useThemeCtx();
  return (
    <Theme name={theme}>
      <SafeAreaProvider>
        <ThemedStatusBar />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Theme>
  );
};
const App = (): React.JSX.Element => {
  return (
    <TamaguiProvider config={config}>
      <ContextProvider>
        <AppContent />
      </ContextProvider>
    </TamaguiProvider>
  );
};

export default App;
