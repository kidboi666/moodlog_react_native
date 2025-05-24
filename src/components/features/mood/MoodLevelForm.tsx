import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { IconButton } from '@/components/shared'
import { Layout } from '@/constants'
import { useStepProgress } from '@/store'
import { MoodLevel } from '@/types'

interface Props {
  moodColor?: string
  moodLevel: MoodLevel
  onMoodLevelChange: (moodLevel: MoodLevel) => void
}

export function MoodLevelForm({
  moodColor,
  moodLevel,
  onMoodLevelChange,
}: Props) {
  const { t } = useTranslation()
  const {
    state: { currentStep },
  } = useStepProgress()

  if (currentStep !== 1) {
    return null
  }

  return (
    <View style={styles.container}>
      {Object.values(MoodLevel).map((level, i) => (
        <View style={styles.formItem} key={level}>
          <IconButton
            style={{
              backgroundColor: moodColor,
              opacity: (i + 1) / Object.values(MoodLevel).length,
            }}
            onPress={() => onMoodLevelChange(level)}
            icon='check'
          />
          <Text>{t(`moods.levels.${level}`)}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
    height: Layout.HEIGHT.WRITE_PROGRESS_BAR_HEIGHT,
  },
  formItem: {
    alignItems: 'center',
    gap: 4,
  },
})
