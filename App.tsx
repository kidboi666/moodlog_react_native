import { RootNavigator } from '@/navigation';
import ContextProvider from '@/store/provider/contextProvider';
import { SafeAreaProvider } from '@/store/provider/safeAreaProvider';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <ContextProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
