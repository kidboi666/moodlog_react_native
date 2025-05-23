import { StyleSheet, View } from 'react-native'

import { useThemedStyles } from '@/hooks'
import { useStepProgress } from '@/store'

export function StepDot() {
  const {
    state: { currentStep, totalSteps },
  } = useStepProgress()

  const themedStyles = useThemedStyles(({ colors }) => ({
    isCurrentStep: {
      backgroundColor: colors.surface.primary,
    },
    dot: {
      backgroundColor: colors.surface.inverse,
    },
  }))
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <View
          style={[
            styles.dot,
            i === currentStep ? themedStyles.isCurrentStep : themedStyles.dot,
          ]}
          key={i}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginVertical: 4,
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
})
