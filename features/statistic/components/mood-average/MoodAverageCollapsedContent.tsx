import { Maximize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { View, XStack, YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/shared/components'
import type { Nullable, SignatureMood } from '@/shared/types'
import { useMood } from 'shared/store'

interface Props {
  hasSignatureMood: boolean
  signatureMood: Nullable<SignatureMood>
}

export const MoodAverageCollapsedContent = ({
  hasSignatureMood,
  signatureMood,
}: Props) => {
  const { t } = useTranslation()
  const moods = useMood(state => state.moods)

  const moodName = signatureMood?.id
    ? moods[signatureMood.id]?.name || signatureMood.id
    : t('common.fallback.text')

  return (
    <ViewContainer>
      <YStackContainer>
        <H3>{t('statistics.mood.title')}</H3>
        <BaseText>{t('statistics.mood.description')}</BaseText>
      </YStackContainer>
      <YStack>
        <XStackContainer>
          <H3>{hasSignatureMood ? moodName : t('common.fallback.text')}</H3>
          <Maximize2 self='flex-end' color='$color8' />
        </XStackContainer>
      </YStack>
    </ViewContainer>
  )
}

const ViewContainer = styled(View, {
  animation: 'quick',
  animateOnly: ['opacity'],
  justify: 'space-between',
  flex: 1,
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
})

const YStackContainer = styled(YStack, {
  gap: '$2',
})

const XStackContainer = styled(XStack, {
  justify: 'space-between',
})
