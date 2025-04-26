import { Plus } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Button, Portal, View, styled } from 'tamagui'

import { Delay, H3, PressableButton } from '@/shared/components'
import {
  ANIMATION_DELAY_MS_QUICK,
  CONTAINER_HORIZONTAL_PADDING,
} from '@/shared/constants'

const menuList = [
  {
    title: 'moods.my.selectTitle',
    route: '/(write)',
  },
  {
    title: 'moods.my.createMoods',
    route: '/(write)/create_mood',
  },
  {
    title: 'moods.my.writeNewDiary',
    route: '/(write)/write_diary',
  },
]

const WriteTabContainer = styled(View, {
  position: 'relative',
})

const IconBox = styled(View, {
  animation: 'quick',

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

export const WriteButton = memo(() => {
  const router = useRouter()
  const { t } = useTranslation()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const handleNavigate = (route: string) => {
    setIsMenuVisible(false)
    router.push(route as any)
  }

  return (
    <WriteTabContainer>
      <PressableButton
        bg='$color12'
        color='$color1'
        onPress={() => setIsMenuVisible(true)}
      >
        <IconBox menuVisible={isMenuVisible}>
          <Plus size='$1' color='$color1' />
        </IconBox>
      </PressableButton>

      <Portal>
        {isMenuVisible && (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={styles.flexible}
          >
            <TouchableWithoutFeedback
              onPress={() => setIsMenuVisible(false)}
              style={styles.flexible}
            >
              <BlurView
                style={[styles.flexible, styles.spacing]}
                tint='dark'
                intensity={80}
                experimentalBlurMethod='dimezisBlurView'
              >
                {menuList.map((menu, i) => (
                  <Delay
                    key={menu.title}
                    variant='float'
                    delay={ANIMATION_DELAY_MS_QUICK[i]}
                  >
                    <Button
                      unstyled
                      hitSlop={20}
                      animation='quick'
                      animateOnly={['opacity']}
                      pressStyle={{
                        opacity: 0.5,
                      }}
                      onPress={() => handleNavigate(menu.route)}
                    >
                      <H3 color='white'>{t(menu.title)}</H3>
                    </Button>
                  </Delay>
                ))}
              </BlurView>
            </TouchableWithoutFeedback>
          </Animated.View>
        )}
      </Portal>
    </WriteTabContainer>
  )
})

const styles = StyleSheet.create({
  flexible: {
    flex: 1,
  },
  spacing: {
    gap: 28,
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING,
    justifyContent: 'center',
  },
})
