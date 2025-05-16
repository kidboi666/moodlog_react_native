import { useTranslation } from 'react-i18next'
import { View, XStack, YStack, styled } from 'tamagui'

import { BaseText, H2, H3 } from '@/components/shared'
import { Layout } from '@/constants'
import { DayBox } from './DayBox'

export function LogStreak() {
  const { t } = useTranslation()
  return (
    <Container>
      <Header>
        <H3>{t('statistics.logStreakDay.title')}</H3>
        <BaseText>{t('statistics.logStreakDay.description')}</BaseText>
      </Header>
      <Description>
        <CountBox>
          <H2>32</H2>
          <Unit>{t('statistics.logStreakDay.unit')}</Unit>
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
