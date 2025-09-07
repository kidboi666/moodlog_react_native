import { StyleSheet, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { MoodName } from '@/src/shared/types'
import { MoodCircle } from './MoodCircle'

interface Props {
  onMoodChange: (moodName: MoodName) => void
  duration: number
}

export function MoodList({ onMoodChange, duration }: Props) {
  return (
    <View style={styles.container}>
      {Object.entries(MoodName).map(([key, value], i) => (
        <Animated.View key={key} entering={FadeInDown.delay(100 * i)}>
          <MoodCircle name={value} onPress={onMoodChange} duration={duration} />
        </Animated.View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
})
