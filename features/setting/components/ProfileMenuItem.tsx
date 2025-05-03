import { useTranslation } from 'react-i18next'
import { YStack, styled } from 'tamagui'

import { BaseText, FormInput } from '@/shared/components'
import type { NewUserInfo } from '@/shared/types'

interface Props {
  label: keyof NewUserInfo
  title: string
  isEditing: boolean
  isLoading: boolean
  onChangeText: (text: string) => void
  value: string | number | null | undefined
}

export const ProfileMenuItem = ({
  label,
  title,
  isEditing,
  isLoading,
  onChangeText,
  value,
  ...props
}: Props) => {
  const { t } = useTranslation()

  return (
    <Container>
      <Title>{t(title)}</Title>
      {isEditing ? (
        <FormInput
          value={value?.toString() ?? ''}
          onChangeText={onChangeText}
          disabled={isLoading}
          keyboardType={typeof value === 'number' ? 'numeric' : undefined}
          {...props}
        />
      ) : (
        <BaseText>{value ?? '-'}</BaseText>
      )}
    </Container>
  )
}

const Container = styled(YStack, {
  gap: '$2',
})

const Title = styled(BaseText, {
  color: '$color11',
})
