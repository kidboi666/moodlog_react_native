import { ThemedStatusBar } from '@/components/common/ThemedStatusBar';
import { RootNavigator } from '@/navigation';
import ContextProvider from '@/store/provider/contextProvider';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <ContextProvider>
        <ThemedStatusBar />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
