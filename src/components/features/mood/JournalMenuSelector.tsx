import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { H3, IconButton } from '@/components/shared'
import { Layout, MOUNT_STYLE } from '@/constants'
import { useStepProgress } from '@/store'

const menuList = [
  {
    title: 'moods.my.moodSelect.title',
    description: 'moods.my.moodSelect.description',
  },
  {
    title: 'moods.my.moodLevel.title',
    description: 'moods.my.moodLevel.description',
  },
  {
    title: 'write.title',
    description: 'write.description',
  },
]

export function JournalMenuSelector() {
  const {
    goToNextStep,
    goToPrevStep,
    state: { currentStep, totalSteps },
  } = useStepProgress()
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <IconButton
        icon='chevron-left'
        disabled={currentStep === 0}
        style={currentStep === 0 ? styles.canNotGo : undefined}
        onPress={goToPrevStep}
      />
      <View key={currentStep}>
        <H3 style={styles.textCenter}>{t(menuList[currentStep].title)}</H3>
        <Text style={styles.textCenter}>
          {t(menuList[currentStep].description)}
        </Text>
      </View>
      <IconButton
        icon='chevron-right'
        disabled={currentStep === totalSteps - 1}
        style={currentStep === totalSteps - 1 ? styles.canNotGo : undefined}
        onPress={goToNextStep}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
    gap: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  canNotGo: {
    opacity: 0.2,
  },
  textCenter: {
    textAlign: 'center',
  },
})
