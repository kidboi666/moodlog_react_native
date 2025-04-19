import { Maximize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { View, XStack, YStack } from 'tamagui'

import { moodTheme } from '@/constants'
import { useApp } from '@/store'
import { EmotionDisplayType, MoodType, SignatureMood } from '@/types'

import { BaseText } from '@/components/shared/BaseText'
import { H2, H3 } from '@/components/shared/Heading'
import { MaximizeButton } from './CollapsedContent.styled'

interface Props {
  signatureMood?: SignatureMood
  hasSignatureMood?: boolean
}

export const CollapsedContent = ({
  signatureMood,
  hasSignatureMood,
}: Props) => {
  if (!hasSignatureMood) {
    return (
      <View flex={1} justifyContent='center' alignItems='center' padding='$4'>
        <H3>감정 데이터가 없습니다</H3>
      </View>
    )
  }

  const { t } = useTranslation()
  const emotionDisplayType = useApp(state => state.settings.emotionDisplayType)

  // 이모지 및 텍스트 계산
  let emoji = '🤔'
  let moodText = t('statistics.mood.title')

  if (signatureMood?.type === MoodType.SIMPLE) {
    emoji = moodTheme.simple.emoji
    moodText = t('common.moods.simple')
  } else if (
    signatureMood?.type &&
    moodTheme[signatureMood.type as keyof typeof moodTheme]
  ) {
    const moodType = signatureMood.type as keyof typeof moodTheme
    emoji = moodTheme[moodType].emoji || '🤔'
    moodText = t(`moods.types.${signatureMood.type}`)
  }

  return (
    <View flex={1} justifyContent='space-between'>
      <YStack gap='$2'>
        <H3>{t('statistics.mood.title')}</H3>
        <BaseText>{t('statistics.mood.description')}</BaseText>
      </YStack>
      <XStack alignItems='center' gap='$2' marginTop='$4'>
        <H2>{emoji}</H2>
        <H2 flex={1}>{moodText}</H2>
        <MaximizeButton icon={Maximize2} />
      </XStack>
    </View>
  )
}
