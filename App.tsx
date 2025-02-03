import { ThemedStatusBar } from '@/components/common/ThemedStatusBar';
import { RootNavigator } from '@/navigation';
import ContextProvider from '@/store/provider/contextProvider';
import { TamaguiProvider } from '@/store/provider/tamaguiProvider';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = (): React.JSX.Element => {
  return (
    <ContextProvider>
      <TamaguiProvider>
        <SafeAreaProvider>
          <ThemedStatusBar />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </TamaguiProvider>
    </ContextProvider>
  );
};

export default App;
