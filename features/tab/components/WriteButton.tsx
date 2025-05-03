import { Plus } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import React, { Fragment, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Button, Portal, View, styled } from 'tamagui'

import { Delay, H3, PressableButton } from '@/shared/components'
import { DelayMS, Layout } from '@/shared/constants'

export const WriteButton = memo(() => {
  const router = useRouter()
  const { t } = useTranslation()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const handleNavigate = (route: string) => {
    setIsMenuVisible(false)
    router.push(route as any)
  }

  return (
    <Fragment>
      <PressableButton
        bg='$color12'
        color='$color1'
        elevate
        onPress={() => setIsMenuVisible(true)}
      >
        <IconBox menuVisible={isMenuVisible}>
          <Plus size='$1' color='$color1' />
        </IconBox>
      </PressableButton>

      {isMenuVisible && (
        <Portal>
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={styles.flexible}
          >
            <TouchableWithoutFeedback
              style={styles.flexible}
              onPress={() => setIsMenuVisible(false)}
            >
              <BlurView
                tint='dark'
                intensity={40}
                experimentalBlurMethod='dimezisBlurView'
                style={styles.blurView}
              >
                {menuList.map((menu, i) => (
                  <Delay
                    key={menu.title}
                    variant='float'
                    delay={DelayMS.ANIMATION.QUICK[i]}
                  >
                    <Button
                      chromeless
                      animation='quick'
                      animateOnly={['opacity']}
                      pressStyle={{ opacity: 0.5 }}
                      onPress={() => handleNavigate(menu.route)}
                    >
                      <H3 color='white'>{t(menu.title)}</H3>
                    </Button>
                  </Delay>
                ))}
              </BlurView>
            </TouchableWithoutFeedback>
          </Animated.View>
        </Portal>
      )}
    </Fragment>
  )
})

const menuList = [
  {
    title: 'moods.my.createMoods',
    route: '/(write)/mood',
  },
  {
    title: 'moods.my.writeNewDiary',
    route: '/(write)/journal',
  },
]

const IconBox = styled(View, {
  animation: 'quick',

  variants: {
    menuVisible: {
      true: { rotate: '45deg' },
      false: { rotate: '0deg' },
    },
  } as const,
})

const styles = StyleSheet.create({
  flexible: {
    flex: 1,
  },
  blurView: {
    flex: 1,
    gap: 28,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING,
    justifyContent: 'center',
  },
})
