import { Maximize2 } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { XStack, YStack } from 'tamagui'

import type { SignatureMood } from '@/types/mood.types'
import type { Nullable } from '@/types/utill.types'
import * as S from './CollapsedContent.styled'

interface Props {
  hasSignatureMood: boolean
  signatureMood: Nullable<SignatureMood>
}

export const CollapsedContent = ({
  hasSignatureMood,
  signatureMood,
}: Props) => {
  const { t } = useTranslation()
  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <S.CardTitle signatureMood={hasSignatureMood}>
          {t('statistics.mood.title')}
        </S.CardTitle>
        <S.CardDescription signatureMood={hasSignatureMood}>
          {t('statistics.mood.description')}
        </S.CardDescription>
      </S.YStackContainer>
      <YStack>
        <XStack>
          <S.MoodText signatureMood={hasSignatureMood}>
            {hasSignatureMood
              ? t(`moods.types.${signatureMood?.type}`)
              : t('common.fallback.text')}
          </S.MoodText>
          <S.MaximizeButton icon={Maximize2} />
        </XStack>
      </YStack>
    </S.ViewContainer>
  )
}
