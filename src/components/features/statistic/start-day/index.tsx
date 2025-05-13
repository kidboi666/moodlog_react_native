import { XStack, YStack, styled } from 'tamagui'

import { BaseText, H2, H3 } from '@/components/shared'
import { Layout } from '@/constants'

export function StartDay() {
  return (
    <Container>
      <H3>기록 시작일</H3>
      <BaseText>시작한 날로부터 일수</BaseText>
      <StyledXStack>
        <H2>3</H2>
        <Unit>일 째</Unit>
      </StyledXStack>
    </Container>
  )
}

const Container = styled(YStack, {
  flex: 1,
  bg: '$gray4',
  rounded: '$8',
  gap: '$2',
  p: '$4',
  height: Layout.HEIGHT.RECORD_CARD_HEIGHT,
  animation: 'bouncy',
  pressStyle: { scale: 0.92 },
})

const StyledXStack = styled(XStack, {
  flex: 1,
  gap: '$2',
  items: 'flex-end',
})

const Unit = styled(BaseText, {
  lineHeight: Layout.HEIGHT.RECORD_UNIT_LINE_HEIGHT,
  color: '$color11',
})
