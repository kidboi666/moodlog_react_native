import { Plus, X } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AnimateMount, PressableButton } from '@/components/shared'
import { ANIMATION_DELAY_MS } from '@/constants'
import { Portal, View, YStack, styled } from 'tamagui'

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

const Overlay = styled(View, {
  position: 'absolute',
  t: 0,
  l: 0,
  r: 0,
  b: 0,
  bg: 'rgba(0, 0, 0, 0.4)',
  z: 1000,
  justify: 'center',
  items: 'center',
  animation: 'quick',
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
  animateOnly: ['opacity'],
})

const ButtonContainer = styled(YStack, {
  width: '80%',
  gap: '$4',
})

const CloseButtonContainer = styled(View, {
  position: 'absolute',
  t: '$6',
  r: '$6',
  bg: 'transparent',
})

export const WriteButton = memo(() => {
  const router = useRouter()
  const { t } = useTranslation()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  const handleNavigate = (route: string) => {
    setIsMenuVisible(false)
    router.push(route as any)
  }

  return (
    <WriteTabContainer>
      <PressableButton bg='$color12' color='$color1' onPress={toggleMenu}>
        <IconBox menuVisible={isMenuVisible}>
          <Plus size='$1' color='$color1' />
        </IconBox>
      </PressableButton>

      {isMenuVisible && (
        <Portal>
          <Overlay onPress={toggleMenu}>
            <CloseButtonContainer>
              <PressableButton
                bg='transparent'
                onPress={() => setIsMenuVisible(false)}
              >
                <X size={24} color='$color1' />
              </PressableButton>
            </CloseButtonContainer>

            <ButtonContainer>
              <AnimateMount variant='float' delay={ANIMATION_DELAY_MS[0]}>
                <PressableButton onPress={() => handleNavigate('/(write)')}>
                  {t('moods.my.selectTitle')}
                </PressableButton>
              </AnimateMount>

              <AnimateMount variant='float' delay={ANIMATION_DELAY_MS[1]}>
                <PressableButton onPress={() => handleNavigate('/create-mood')}>
                  {t('moods.my.createMoods')}
                </PressableButton>
              </AnimateMount>

              <AnimateMount variant='float' delay={ANIMATION_DELAY_MS[2]}>
                <PressableButton
                  onPress={() => handleNavigate('/(write)/write-diary')}
                >
                  {t('moods.my.writeNewDiary')}
                </PressableButton>
              </AnimateMount>
            </ButtonContainer>
          </Overlay>
        </Portal>
      )}
    </WriteTabContainer>
  )
})
