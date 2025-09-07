import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'
import { MD3Colors } from 'react-native-paper'

import { H3 } from '@/src/components/shared'
import { WEEK_DAY } from '@/src/constants'

const mockData = [true, true, false, false, false, false, false]

export function DayBox() {
  const fillDay = [MD3Colors.primary90, MD3Colors.primary40]
  const emptyDay = [MD3Colors.neutral90, MD3Colors.neutral40]
  return (
    <View style={styles.container}>
      {Object.values(WEEK_DAY).map((day, i) => (
        <View key={day} style={styles.dayBox}>
          <LinearGradient
            style={styles.gradient}
            colors={mockData[i] ? (fillDay as any) : (emptyDay as any)}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 2, y: 3 }}
          />
          <H3>{day}</H3>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dayBox: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
  },
  gradient: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
})
