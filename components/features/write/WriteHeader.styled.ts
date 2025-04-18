import { styled } from 'tamagui'

import {
  CONTAINER_HORIZONTAL_PADDING,
  CONTAINER_VERTICAL_PADDING,
} from '@/constants'

import { HeaderContainer as HOSHeaderContainer } from '@/components/shared/HeaderContainer.styleable'
import { PressableButton } from '@/components/shared/PressableButton.styled'

export const HeaderContainer = styled(HOSHeaderContainer, {
  px: CONTAINER_HORIZONTAL_PADDING,
  py: CONTAINER_VERTICAL_PADDING,
})

export const BackButton = styled(PressableButton)
