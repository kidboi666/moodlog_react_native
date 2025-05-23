import { StyleSheet } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { IconButton } from '@/components/shared'
import { useThemedStyles } from '@/hooks'

interface ActionButtonProps {
  showActionButton: boolean
  onPress: () => void
}

export function ActionButton({ showActionButton, onPress }: ActionButtonProps) {
  const themedStyles = useThemedStyles(({ tokens }) => ({
    deleteButton: {
      backgroundColor: tokens.semantic.error.main,
    },
  }))
  return (
    showActionButton && (
      <Animated.View
        style={styles.container}
        entering={FadeIn.duration(800)}
        exiting={FadeOut.duration(300)}
      >
        <IconButton
          style={themedStyles.deleteButton}
          icon='delete'
          onPress={onPress}
        />
      </Animated.View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: -1,
    right: 0,
  },
})
