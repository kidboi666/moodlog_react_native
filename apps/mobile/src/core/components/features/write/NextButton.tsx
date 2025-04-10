import { Check } from '@tamagui/lucide-icons'
import React from 'react'

import * as S from './NextButton.styled'

interface Props {
  isSelected: boolean
  onPress: () => void
}

export const NextButton = ({ isSelected, onPress }: Props) => {
  return (
    <S.AnimatedContainer>
      <S.NextButton icon={Check} disabled={!isSelected} onPress={onPress} />
    </S.AnimatedContainer>
  )
}
