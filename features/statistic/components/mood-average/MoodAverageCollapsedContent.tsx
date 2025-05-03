import { Maximize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { GetThemeValueForKey, View, XStack, YStack, styled } from 'tamagui'

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

  const signatureMoodId = signatureMood?.id ?? ''

  return (
    <Container>
      <YStackContainer>
        <H3>{t('statistics.mood.title')}</H3>
        <BaseText>{t('statistics.mood.description')}</BaseText>
      </YStackContainer>
      <XStackContainer>
        <View
          bg={
            moods[signatureMoodId]
              ?.color as GetThemeValueForKey<'backgroundColor'>
          }
          p='$2'
          rounded='$4'
        >
          <H3>
            {hasSignatureMood
              ? moods[signatureMoodId]?.name
              : t('common.fallback.text')}
          </H3>
        </View>
        <Maximize2 self='flex-end' color='$color8' />
      </XStackContainer>
    </Container>
  )
}

const Container = styled(View, {
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
