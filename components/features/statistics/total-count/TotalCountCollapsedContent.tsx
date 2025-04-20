import { Maximize2 } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack } from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'
import { H2, H3 } from '@/components/shared/Heading'
import * as S from './TotalCountCollapsedContent.styled'

interface Props {
  totalCount: number
}

export const TotalCountCollapsedContent = memo(({ totalCount }: Props) => {
  const { t } = useTranslation()
  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <H3>{t('statistics.totalCount.title')}</H3>
        <BaseText>{t('statistics.totalCount.description')}</BaseText>
      </S.YStackContainer>
      <XStack>
        <S.StackContainer>
          <H2>{totalCount}</H2>
          <S.CountText>{t('common.units.count')}</S.CountText>
        </S.StackContainer>
        <S.MinimizeButton icon={Maximize2} />
      </XStack>
    </S.ViewContainer>
  )
})
