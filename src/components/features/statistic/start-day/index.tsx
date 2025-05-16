import { useTranslation } from 'react-i18next'
import { XStack, YStack, styled } from 'tamagui'

import { BaseText, H2, H3 } from '@/components/shared'
import { Layout } from '@/constants'
import { useAuth } from '@/store'
import { getDaysSinceSignup } from '@/utils'

export function StartDay() {
  const { t } = useTranslation()
  const session = useAuth(state => state.session)
  const createdAt = session?.user?.created_at || ''
  const daysSinceSignup = getDaysSinceSignup(createdAt)

  return (
    <Container>
      <H3>{t('statistics.daysSinceSignup.title')}</H3>
      <BaseText>{t('statistics.daysSinceSignup.description')}</BaseText>
      <StyledXStack>
        <H2>{daysSinceSignup}</H2>
        <Unit>{t('statistics.daysSinceSignup.unit')}</Unit>
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
