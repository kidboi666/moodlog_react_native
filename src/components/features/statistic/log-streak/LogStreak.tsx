import { View, XStack, styled } from 'tamagui'

import { BaseText, H2, H3 } from '@/components/shared'
import { Layout } from '@/constants'
import { DayBox } from './DayBox'

export function LogStreak() {
  return (
    <Container>
      <H3>기록 연속 일수</H3>
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
