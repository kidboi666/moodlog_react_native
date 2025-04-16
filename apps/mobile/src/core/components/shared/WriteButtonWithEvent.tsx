import { Plus } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import * as S from './WriteButtonWithEvent.styled'

export const WriteButtonWithEvent = memo(() => {
  const router = useRouter()

  return (
    <S.WriteTabContainer>
      <S.WriteButton onPress={() => router.push('/write')}>
        <S.IconBox>
          <Plus size='$1' color='$color1' />
        </S.IconBox>
      </S.WriteButton>
    </S.WriteTabContainer>
  )
})
