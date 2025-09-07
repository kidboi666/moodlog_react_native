import { StyleSheet, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Animated from 'react-native-reanimated'

import { H4 } from '@/src/shared/components'
import { COLORS } from '@/src/shared/constants'
import { MoodName } from '@/src/shared/types'

interface Props {
  onPress: (moodName: MoodName) => void
  name: MoodName
  duration: number
}

const r = 80
const size = r * 2

export function MoodCircle({ onPress, name }: Props) {
  return (
    <View style={styles.container}>
      <Animated.View style={styles.animatedView}>
        <TouchableRipple
          borderless
          style={[styles.inner, { backgroundColor: COLORS.mood[name] }]}
          onPress={() => onPress(name)}
        >
          <H4>{name}</H4>
        </TouchableRipple>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedView: {
    borderRadius: size / 2,
    width: size,
    height: size,
  },
  inner: {
    borderRadius: size / 2,
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portalView: {
    flex: 1,
  },
})
