import { useRouter } from 'expo-router'

import { ArrowLeft } from '@tamagui/lucide-icons'
import * as S from './SettingHeader.styled'

export const SettingHeader = () => {
  const router = useRouter()

  return (
    <S.HeaderContainer>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
      <S.RestBox />
    </S.HeaderContainer>
  )
}
