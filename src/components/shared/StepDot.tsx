import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useStepProgress } from '@/store'

export function StepDot() {
  const theme = useTheme()
  const {
    state: { currentStep, totalSteps },
  } = useStepProgress()

  const themedStyles = {
    isCurrentStep: {
      backgroundColor: theme.colors.onSurface,
    },
    dot: {
      backgroundColor: theme.colors.surfaceDisabled,
    },
  }

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
