import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, XStack, YStack } from 'tamagui'

import { simpleMoodTheme } from '@/constants'
import { SimpleMoodLevel } from '@/types'

interface Props {
  selectedMoodLevel?: SimpleMoodLevel
  onMoodChange: (level: SimpleMoodLevel) => void
  disabled?: boolean
}

export const PickerSimpleMood = ({
  selectedMoodLevel,
  onMoodChange,
  disabled = false,
}: Props) => {
  const { t } = useTranslation()

  const handleMoodChange = useCallback(
    (level: SimpleMoodLevel) => {
      if (disabled) return
      onMoodChange(level)
    },
    [onMoodChange, disabled],
  )

  return (
    <YStack space='$4' width='100%'>
      <XStack flexDirection='row' width='100%' gap='$2' justify='center'>
        {Object.values(SimpleMoodLevel).map(level => (
          <Button
            key={level}
            size='$4'
            mr='$1'
            ml='$1'
            bg={simpleMoodTheme[level]}
            opacity={selectedMoodLevel === level ? 1 : 0.6}
            scale={selectedMoodLevel === level ? 1.1 : 1}
            animation='bouncy'
            pressStyle={{ scale: 0.95 }}
            onPress={() => handleMoodChange(level)}
            disabled={disabled}
          >
            <Text
              color='white'
              fontWeight={selectedMoodLevel === level ? 'bold' : 'normal'}
            >
              {t(`moods.simpleLevels.${level}`)}
            </Text>
          </Button>
        ))}
      </XStack>
      {selectedMoodLevel && (
        <Text fontSize='$4' text='center'>
          {t(`moods.simpleLevels.${selectedMoodLevel}`)}
        </Text>
      )}
    </YStack>
  )
}
