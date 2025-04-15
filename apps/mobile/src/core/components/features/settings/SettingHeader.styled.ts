import { View, styled } from 'tamagui'

import { HeaderContainer as HOSHeaderContainer } from '@/core/components/shared/HeaderContainer.styleable'
import { PressableButton } from '@/core/components/shared/PressableButton.styled'
import {
  CONTAINER_HORIZONTAL_PADDING,
  CONTAINER_VERTICAL_PADDING,
} from '@/core/constants/size'

export const HeaderContainer = styled(HOSHeaderContainer)

export const BackButton = styled(PressableButton)

export const RestBox = styled(View, {
  flex: 1,
})
