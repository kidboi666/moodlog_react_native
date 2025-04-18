import { Button, styled } from 'tamagui'

import { BaseText } from '@/components/shared/BaseText'

export const SettingsNavigationButton = styled(Button, {
  animation: 'quick',
  justify: 'flex-start',
  bg: '$color4',
  size: '$5',
  fontSize: '$6',
})

export const ItemLabel = styled(BaseText, {
  fontSize: '$5',
  flex: 1,
})
