import { ArrowLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { memo } from 'react'

import * as S from './SettingHeader.styled'

export const SettingHeader = memo(() => {
  const router = useRouter()

  return (
    <S.HeaderContainer>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
      <S.RestBox />
    </S.HeaderContainer>
  )
})
