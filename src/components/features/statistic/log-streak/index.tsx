import { View, XStack, YStack, styled } from 'tamagui'

import { BaseText, H2, H3 } from '@/components/shared'
import { Layout } from '@/constants'
import { DayBox } from './DayBox'

export function LogStreak() {
  return (
    <Container>
      <Header>
        <H3>기록 연속 일수</H3>
        <BaseText>끊임없이 매일 연속으로 기록한 일수</BaseText>
      </Header>
      <Description>
        <CountBox>
          <H2>32</H2>
          <Unit>일 째</Unit>
        </CountBox>
      </Description>
      <DayBox />
    </Container>
  )
}

const Container = styled(View, {
  bg: '$color4',
  p: '$4',
  rounded: '$7',
  gap: '$4',
  animation: 'bouncy',
  pressStyle: { scale: 0.92 },
})
const Header = styled(YStack, {
  gap: '$2',
})
const Description = styled(XStack, {
  items: 'center',
  gap: '$2',
})

const CountBox = styled(XStack, {
  gap: '$2',
  items: 'flex-end',
})

const Unit = styled(BaseText, {
  lineHeight: Layout.HEIGHT.RECORD_UNIT_LINE_HEIGHT,
  color: '$color11',
})
