import { StyleSheet } from 'react-native'
import { IconButton, MD3Colors } from 'react-native-paper'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

interface ActionButtonProps {
  showActionButton: boolean
  onPress: () => void
}

export function ActionButton({ showActionButton, onPress }: ActionButtonProps) {
  return (
    showActionButton && (
      <Animated.View
        style={styles.container}
        entering={FadeIn.duration(800)}
        exiting={FadeOut.duration(300)}
      >
        <IconButton
          icon='delete'
          containerColor={MD3Colors.error40}
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
