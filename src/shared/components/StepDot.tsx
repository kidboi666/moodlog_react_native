import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useStepProgress } from '@/src/shared/context'

export function StepDot() {
  const theme = useTheme()
  const {
    state: { currentStep, totalSteps },
  } = useStepProgress()

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                i === currentStep
                  ? theme.colors.onSurface
                  : theme.colors.surfaceDisabled,
            },
          ]}
          key={i}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
})
