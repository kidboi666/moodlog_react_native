import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Spinner, XGroup } from 'tamagui'

import { BaseText } from '@/core/components/shared/BaseText'
import type { Nullable } from '@/types/util.types'
import * as S from './ActionButtons.styled'

interface Props {
  onImageUriChange: () => Promise<Nullable<void>>
  onTimeStamp: () => void
  isSubmitted: boolean
  isLoading: boolean
  content: string
}

export const ActionButtons = memo(
  ({
    onImageUriChange,
    onTimeStamp,
    isSubmitted,
    isLoading,
    content,
  }: Props) => {
    const { t } = useTranslation()
    const isDisabled = isSubmitted || isLoading || !content
    return (
      <S.XGroupContainer>
        <XGroup.Item>
          <S.ActionButton onPress={onImageUriChange} icon={ImagePlus}>
            {t('common.addCover')}
          </S.ActionButton>
        </XGroup.Item>
        <S.Separator />
        <XGroup.Item>
          <S.ActionButton onPress={onTimeStamp} icon={Timer}>
            {t('common.timeStamp')}
          </S.ActionButton>
        </XGroup.Item>
        <S.Separator />
        <XGroup.Item>
          <Form.Trigger asChild>
            <S.SubmitButton disabled={isDisabled}>
              {isLoading || isSubmitted ? (
                <Spinner color='$color12' />
              ) : (
                <Check />
              )}
            </S.SubmitButton>
          </Form.Trigger>
        </XGroup.Item>
      </S.XGroupContainer>
    )
  },
)
