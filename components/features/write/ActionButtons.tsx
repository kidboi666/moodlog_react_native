import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Separator, Spinner, View, XGroup } from 'tamagui'

import type { Nullable } from '@/types'

import { BaseText } from '@/components/shared/BaseText'
import { PressableButton } from '@/components/shared/PressableButton'
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
      <View items='flex-end'>
        <XGroup>
          <XGroup.Item>
            <PressableButton onPress={onImageUriChange} icon={ImagePlus}>
              {t('common.addCover')}
            </PressableButton>
          </XGroup.Item>
          <Separator vertical />
          <XGroup.Item>
            <PressableButton onPress={onTimeStamp} icon={Timer}>
              {t('common.timeStamp')}
            </PressableButton>
          </XGroup.Item>
          <Separator vertical />
          <XGroup.Item>
            <PressableButton
              onPress={onSubmit}
              disabled={isSubmitted || isLoading || !content}
            >
              {isLoading ? <Spinner /> : <Check />}
            </PressableButton>
          </XGroup.Item>
        </XGroup>
      </View>
    )
  },
)
