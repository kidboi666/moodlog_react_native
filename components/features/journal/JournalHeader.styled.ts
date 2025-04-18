import { XStack, YStack, styled } from 'tamagui'

import { CONTAINER_HORIZONTAL_PADDING } from '@/constants'

import { HeaderContainer as HOSHeaderContainer } from '@/components/shared/HeaderContainer.styleable'
import { PressableButton } from '@/components/shared/PressableButton.styled'
import { RenderDate } from '@/components/shared/RenderDate.styleable'
import { RenderDay } from '@/components/shared/RenderDay.styleable'
import { RenderTime } from '@/components/shared/RenderTime.styleable'

export const HeaderContainer = styled(HOSHeaderContainer, {
  items: 'center',
  px: CONTAINER_HORIZONTAL_PADDING,
})

export const DateContainer = styled(YStack, {
  items: 'center',
})

export const TimeText = styled(RenderTime, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
})

export const DayText = styled(RenderDay, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
})

export const DateText = styled(RenderDate, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
})

export const DayWithTimeBox = styled(XStack, {
  gap: '$2',
})

export const BackButton = styled(PressableButton)

export const DeleteButton = styled(PressableButton)
