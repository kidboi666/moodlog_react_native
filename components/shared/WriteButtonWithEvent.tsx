import { Plus } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { memo } from 'react'

import { View, styled } from 'tamagui'
import { PressableButton } from './PressableButton'

const WriteTabContainer = styled(View, {
  position: 'relative',
})

const IconBox = styled(View, {
  animation: 'lazy',

  variants: {
    menuVisible: {
      true: {
        rotate: '45deg',
      },
      false: {
        rotate: '0deg',
      },
    },
  } as const,
})

export const WriteButtonWithEvent = memo(() => {
  const router = useRouter()

  return (
    <WriteTabContainer>
      <PressableButton
        bg='$color12'
        color='$color1'
        onPress={() => router.push('/(write)')}
      >
        <IconBox>
          <Plus size='$1' color='$color1' />
        </IconBox>
      </PressableButton>
    </WriteTabContainer>
  )
})
