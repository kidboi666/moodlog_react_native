import { useRouter } from 'expo-router'

import { HeaderContainer } from '@/core/components/shared/HeaderContainer.styleable'
import { ArrowLeft } from '@tamagui/lucide-icons'
import * as S from './SettingHeader.styled'

export const SettingHeader = () => {
  const router = useRouter()

  return (
    <HeaderContainer edges={['top', 'bottom']}>
      <S.BackButton icon={ArrowLeft} onPress={() => router.back()} />
      <S.RestBox />
    </HeaderContainer>
  )
}
