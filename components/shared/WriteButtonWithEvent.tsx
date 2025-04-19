import { Plus } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { memo } from 'react'

import { PressableButton } from './PressableButton'
import * as S from './WriteButtonWithEvent.styled'

export const WriteButtonWithEvent = memo(() => {
  const router = useRouter()

  return (
    <S.WriteTabContainer>
      <PressableButton
        bg='$color12'
        color='$color1'
        onPress={() => router.push('/write')}
      >
        <S.IconBox>
          <Plus size='$1' color='$color1' />
        </S.IconBox>
      </PressableButton>
    </S.WriteTabContainer>
  )
})
