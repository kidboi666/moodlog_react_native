import { Maximize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { H2, View, XStack, YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/shared/components'
import type { Nullable, SignatureMood } from '@/shared/types'
import { useMood } from 'shared/store'

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

const CardTitle = styled(H3, {
  color: '$gray12',

  variants: {
    signatureMood: {
      true: {
        color: '$gray1',
      },
    },
  } as const,
})

const CardDescription = styled(BaseText, {
  color: '$gray12',

  variants: {
    signatureMood: {
      true: {
        color: '$gray1',
      },
    },
  } as const,
})

const MoodText = styled(H2, {
  color: '$gray12',
  flex: 1,

  variants: {
    signatureMood: {
      true: {
        color: '$gray1',
      },
    },
  } as const,
})

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

  // 해당 감정 ID로 이름 찾기
  const moodName = signatureMood?.type
    ? moods[signatureMood.type]?.name || signatureMood.type
    : t('common.fallback.text')

  return (
    <ViewContainer>
      <YStackContainer>
        <CardTitle signatureMood={hasSignatureMood}>
          {t('statistics.mood.title')}
        </CardTitle>
        <CardDescription signatureMood={hasSignatureMood}>
          {t('statistics.mood.description')}
        </CardDescription>
      </YStackContainer>
      <YStack>
        <XStack>
          <MoodText signatureMood={hasSignatureMood}>
            {hasSignatureMood ? moodName : t('common.fallback.text')}
          </MoodText>
          <Maximize2 self='flex-end' color='$color8' />
        </XStack>
      </YStack>
    </ViewContainer>
  )
}
