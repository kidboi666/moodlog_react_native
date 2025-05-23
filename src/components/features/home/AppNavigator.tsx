import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { BottomSheet } from '@/components/features/modal'
import { useThemedStyles } from '@/hooks'
import { MainStack } from './MainStack'

export function AppNavigator() {
  const themedStyles = useThemedStyles(({ colors }) => ({
    rootView: {
      flex: 1,
      backgroundColor: colors.action.primary,
    },
  }))

  return (
    <GestureHandlerRootView style={themedStyles.rootView}>
      <MainStack />
      <BottomSheet />
    </GestureHandlerRootView>
  )
}
