import { View, styled } from 'tamagui'

import { HeaderContainer as HOSHeaderContainer } from '@/components/shared/HeaderContainer.styleable'
import { PressableButton } from '@/components/shared/PressableButton.styled'

export const HeaderContainer = styled(HOSHeaderContainer)

export const BackButton = styled(PressableButton)

export const RestBox = styled(View, {
  flex: 1,
})
