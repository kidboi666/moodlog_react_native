import { ImagePlus } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, View, XGroup, styled } from 'tamagui'

import { BaseText } from '@/components/shared'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants'

interface Props {
  onImageUriChange: () => void
  show: boolean
}

function _ActionButtons({ onImageUriChange, show }: Props) {
  const { t } = useTranslation()

  if (!show) {
    return null
  }

  return (
    <Container>
      <XGroup>
        <XGroup.Item>
          <Button noTextWrap onPress={onImageUriChange} icon={ImagePlus}>
            <BaseText>{t('common.addCover')}</BaseText>
          </Button>
        </XGroup.Item>
      </XGroup>
    </Container>
  )
}

const Container = styled(View, {
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,
  items: 'flex-end',
})

export const ActionButtons = memo(_ActionButtons)

ActionButtons.displayName = 'ActionButtons'
