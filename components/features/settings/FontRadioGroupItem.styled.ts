import { RadioGroup, styled } from 'tamagui'

import { MOUNT_STYLE } from '@/constants/animations'
import { BaseText } from '../../shared/BaseText'

export const FontItemLabel = styled(BaseText, {
  flex: 1,
})

export const StyledFontGroupItem = styled(RadioGroup.Item)

export const StyledFontGroupIndicator = styled(RadioGroup.Indicator, {
  animation: 'medium',
  enterStyle: MOUNT_STYLE,
})
