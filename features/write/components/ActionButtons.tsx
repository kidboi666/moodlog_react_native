import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Separator, Spinner, View, XGroup } from 'tamagui'

import { BaseText } from '@/shared/components'
import { useUI } from '@/shared/store'
import type { Nullable } from '@/shared/types'

interface Props {
  isSubmitted: boolean
  content: string
  onImageUriChange: () => Promise<Nullable<void>>
  onTimeStamp: () => void
  onSubmit: () => void
}

export const ActionButtons = memo(
  ({
    isSubmitted,
    content,
    onImageUriChange,
    onTimeStamp,
    onSubmit,
  }: Props) => {
    const isLoading = useUI(state => state.isLoading)
    const { t } = useTranslation()
    return (
      <View items='flex-end'>
        <XGroup>
          <XGroup.Item>
            <Button noTextWrap onPress={onImageUriChange} icon={ImagePlus}>
              <BaseText>{t('common.addCover')}</BaseText>
            </Button>
          </XGroup.Item>
          <Separator vertical />
          <XGroup.Item>
            <Button noTextWrap onPress={onTimeStamp} icon={Timer}>
              <BaseText>{t('common.timeStamp')}</BaseText>
            </Button>
          </XGroup.Item>
          <Separator vertical />
          <XGroup.Item>
            <Button
              onPress={onSubmit}
              disabled={isSubmitted || isLoading || !content}
              opacity={isSubmitted || isLoading || !content ? 0.5 : 1}
            >
              {isLoading ? <Spinner /> : <Check />}
            </Button>
          </XGroup.Item>
        </XGroup>
      </View>
    )
  },
)
