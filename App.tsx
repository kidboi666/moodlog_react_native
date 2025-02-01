import { useTheme } from '@/hooks/useTheme';
import ContextProvider from '@/store/provider';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
} from 'react-native';

function App(): React.JSX.Element {
  const theme = useTheme();
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (
    <ContextProvider>
      <SafeAreaView style={theme.colors.background}>
        <StatusBar
          barStyle={theme.barStyle}
          backgroundColor={theme.colors.background.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={theme.colors.background}>
          <Text>Hello</Text>
          <Text>Height: {height}</Text>
          <Text>Width: {width}</Text>
          <Text>Scale: {scale}</Text>
          <Text>FontScale: {fontScale}</Text>
        </ScrollView>
      </SafeAreaView>
    </ContextProvider>
  );
}

export default App;
