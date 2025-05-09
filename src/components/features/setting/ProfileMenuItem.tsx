import { useTranslation } from 'react-i18next'
import { YStack, styled } from 'tamagui'

import { BaseText } from '@/components/shared'

interface Props {
  title: string
  value: string | number | null | undefined
}

export const ProfileMenuItem = ({ title, value }: Props) => {
  const { t } = useTranslation()

  return (
    <Container>
      <Title>{t(title)}</Title>
      <BaseText>{value ?? '-'}</BaseText>
    </Container>
  )
}

const Container = styled(YStack, {
  gap: '$2',
})

const Title = styled(BaseText, {
  color: '$color11',
})
