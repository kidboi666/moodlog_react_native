import { ImagePlus, Timer } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Separator, View, XGroup } from 'tamagui'

import { BaseText } from '@/shared/components'

interface Props {
  onImageUriChange: () => void
  onTimeStamp: () => void
}

export const ActionButtons = memo(
  ({ onImageUriChange, onTimeStamp }: Props) => {
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
        </XGroup>
      </View>
    )
  },
)
