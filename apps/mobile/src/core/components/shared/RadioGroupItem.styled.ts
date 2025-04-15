import { RadioGroup, styled } from 'tamagui'

import { PressableButton } from '@/core/components/shared/PressableButton.styled'
import { MOUNT_STYLE } from '@/styles/animations'
import { BaseText } from './BaseText'

export const RadioGroupContainerButton = styled(PressableButton, {
  width: '100%',
  justify: 'flex-start',
  bg: '$background',
  size: '$5',
})

export const RadioItemLabel = styled(BaseText, {
  fontSize: '$5',
  flex: 1,
})

export const StyledRadioGroupItem = styled(RadioGroup.Item)

export const StyledRadioGroupIndicator = styled(RadioGroup.Indicator, {
  animation: 'medium',
  enterStyle: MOUNT_STYLE,
})
