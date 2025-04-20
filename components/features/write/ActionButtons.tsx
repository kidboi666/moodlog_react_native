import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Separator, Spinner, View, XGroup } from 'tamagui'

import type { Nullable } from '@/types'

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
            <Button onPress={onImageUriChange} icon={ImagePlus}>
              {t('common.addCover')}
            </Button>
          </XGroup.Item>
          <Separator vertical />
          <XGroup.Item>
            <Button onPress={onTimeStamp} icon={Timer}>
              {t('common.timeStamp')}
            </Button>
          </XGroup.Item>
          <Separator vertical />
          <XGroup.Item>
            <Button
              onPress={onSubmit}
              disabled={isSubmitted || isLoading || !content}
            >
              {isLoading ? <Spinner /> : <Check />}
            </Button>
          </XGroup.Item>
        </XGroup>
      </View>
    )
  },
)
