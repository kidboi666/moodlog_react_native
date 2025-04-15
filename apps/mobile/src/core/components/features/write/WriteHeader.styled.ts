import { styled } from 'tamagui'

import { HeaderContainer as HOSHeaderContainer } from '@/core/components/shared/HeaderContainer.styleable'
import { PressableButton } from '@/core/components/shared/PressableButton.styled'
import {
  CONTAINER_HORIZONTAL_PADDING,
  CONTAINER_VERTICAL_PADDING,
} from '@/core/constants/size'

export const HeaderContainer = styled(HOSHeaderContainer, {
  px: CONTAINER_HORIZONTAL_PADDING,
  py: CONTAINER_VERTICAL_PADDING,
})

export const BackButton = styled(PressableButton, {})
