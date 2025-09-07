import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ActivityIndicator, useTheme } from 'react-native-paper'

import { BottomSheet } from '@/src/components/features/sheet'
import { RootProvider } from '@/src/providers'
import { useApp } from '@/src/store'

export default function RootLayout() {
  const [loaded] = useFonts({
    'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.ttf'),
    'LeeSeoyun-Regular': require('@/assets/fonts/LeeSeoyun-Regular.ttf'),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <RootProvider>
      <AppNavigator />
    </RootProvider>
  )
}

export function AppNavigator() {
  const { colors } = useTheme()
  const isOnboardingCompleted = useApp(state => state.isOnboardingCompleted)

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Protected guard={!isOnboardingCompleted}>
          <Stack.Screen name='(onboarding)' />
        </Stack.Protected>
        <Stack.Protected guard={isOnboardingCompleted}>
          <Stack.Screen name='(tabs)' />
        </Stack.Protected>
        <Stack.Screen name='(journal)' />
        <Stack.Screen name='+not-found' />
      </Stack>
      <BottomSheet />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
})
