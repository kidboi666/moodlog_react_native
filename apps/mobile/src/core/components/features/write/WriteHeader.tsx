import { ArrowLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import React from 'react'

import * as S from './WriteHeader.styled'

export const WriteHeader = () => {
  const router = useRouter()
  return (
    <S.HeaderContainer edges={['top', 'bottom']}>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
    </S.HeaderContainer>
  )
}
