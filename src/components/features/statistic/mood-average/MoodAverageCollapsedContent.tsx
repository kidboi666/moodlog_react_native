import { Maximize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { View, XStack, YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/components/shared'
import { useMood } from '@/store'
import type { Maybe, SignatureMood } from '@/types'

interface Props {
  hasSignatureMood: boolean
  signatureMood: Maybe<SignatureMood>
}

export const MoodAverageCollapsedContent = ({
  hasSignatureMood,
  signatureMood,
}: Props) => {
  const { t } = useTranslation()
  const moods = useMood(state => state.moods)

  const signatureMoodId = signatureMood?.id ?? ''
  const signatureMoodColor = moods[signatureMoodId]?.color ?? '$gray10'
  const signatureMoodName = moods[signatureMoodId]?.name ?? ''

  return (
    <Container>
      <YStackContainer>
        <H3>{t('statistics.mood.title')}</H3>
        <BaseText>{t('statistics.mood.description')}</BaseText>
      </YStackContainer>
      <XStackContainer>
        <SignatureMoodBox moodColor={signatureMoodColor}>
          <H3>
            {hasSignatureMood ? signatureMoodName : t('common.fallback.text')}
          </H3>
        </SignatureMoodBox>
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

const SignatureMoodBox = styled(View, {
  p: '$2',
  rounded: '$4',
  variants: {
    moodColor: {
      ':string': bg => ({ bg }),
    },
  },
})
