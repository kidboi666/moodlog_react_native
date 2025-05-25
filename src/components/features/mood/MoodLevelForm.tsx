import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, MD3Colors } from 'react-native-paper'

import { H6 } from '@/components/shared'
import { useStepProgress } from '@/store'
import { MoodLevel } from '@/types'

interface Props {
  moodColor?: string
  selectedMoodLevel: MoodLevel
  onMoodLevelChange: (moodLevel: MoodLevel) => void
}

export function MoodLevelForm({
  moodColor,
  selectedMoodLevel,
  onMoodLevelChange,
}: Props) {
  const { t } = useTranslation()
  const { setStep } = useStepProgress()
  const arrMoodLevel = Object.values(MoodLevel)

  return (
    <View style={styles.container}>
      {arrMoodLevel.map((moodLevel, i) => (
        <View key={moodLevel} style={[styles.formItem]}>
          <Button
            icon='check'
            mode='contained'
            buttonColor={moodColor}
            style={{ opacity: (i + 1) / Object.values(MoodLevel).length }}
            rippleColor={i === 0 ? MD3Colors.neutral40 : MD3Colors.neutral50}
            onPress={() => onMoodLevelChange(moodLevel)}
          >
            <H6>{moodLevel}</H6>
          </Button>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formItem: {},
})
