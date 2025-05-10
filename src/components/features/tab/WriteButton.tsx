import { Plus } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import React, { Fragment, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { Portal, View, styled } from 'tamagui'

import { H3, PressableButton } from '@/components/shared'
import { Layout, MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/constants'

type RouteNames = '/(write)/mood' | '/(write)/journal'

interface MenuItemProps {
  title: string
  route: RouteNames
}

const menuList: MenuItemProps[] = [
  {
    title: 'moods.my.createMoods',
    route: '/(write)/mood',
  },
  {
    title: 'moods.my.writeNewDiary',
    route: '/(write)/journal',
  },
]

function _WriteButton() {
  const router = useRouter()
  const { t } = useTranslation()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const handleNavigate = (route: RouteNames) => {
    setIsMenuVisible(false)
    router.push(route)
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
          <EnteringView>
            <TouchableWithoutFeedback
              style={styles.flexible}
              onPress={() => setIsMenuVisible(false)}
            >
              <BlurView tint='dark' intensity={40} style={styles.blurView}>
                {menuList.map((menu, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleNavigate(menu.route)}
                  >
                    <H3 color='white'>{t(menu.title)}</H3>
                  </TouchableOpacity>
                ))}
              </BlurView>
            </TouchableWithoutFeedback>
          </EnteringView>
        </Portal>
      )}
    </Fragment>
  )
}

const EnteringView = styled(View, {
  flex: 1,
  animation: 'lazy',
  enterStyle: MOUNT_STYLE,
  exitStyle: MOUNT_STYLE,
  animateOnly: MOUNT_STYLE_KEY,
})

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
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING * 2,
    justifyContent: 'center',
  },
})

export const WriteButton = memo(_WriteButton)

WriteButton.displayName = 'WriteButton'
