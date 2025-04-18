import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Spinner, XGroup } from 'tamagui'

import type { Nullable } from '@/types'

import { BaseText } from '@/components/shared/BaseText'
import * as S from './ActionButtons.styled'

interface Props {
  isSubmitted: boolean
  isLoading: boolean
  content: string
  onImageUriChange: () => Promise<Nullable<void>>
  onTimeStamp: () => void
  onSubmit: () => void
}

export const ActionButtons = memo(
  ({
    isSubmitted,
    isLoading,
    content,
    onImageUriChange,
    onTimeStamp,
    onSubmit,
  }: Props) => {
    const { t } = useTranslation()
    return (
      <S.XGroupContainer>
        <XGroup.Item>
          <S.ActionButton onPress={onImageUriChange} icon={ImagePlus}>
            <BaseText>{t('common.addCover')}</BaseText>
          </S.ActionButton>
        </XGroup.Item>
        <S.Separator />
        <XGroup.Item>
          <S.ActionButton onPress={onTimeStamp} icon={Timer}>
            <BaseText>{t('common.timeStamp')}</BaseText>
          </S.ActionButton>
        </XGroup.Item>
        <S.Separator />
        <XGroup.Item>
          <S.SubmitButton
            onPress={onSubmit}
            disabled={isSubmitted || isLoading || !content}
          >
            {isLoading ? <Spinner /> : <Check />}
          </S.SubmitButton>
        </XGroup.Item>
      </S.XGroupContainer>
    )
  },
)
