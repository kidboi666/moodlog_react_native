import { Plus } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { TabTrigger } from 'expo-router/ui'
import React, { Fragment, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { Button, Portal } from 'react-native-paper'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { H3 } from '@/components/shared'
import { Layout } from '@/constants'

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
      <Button mode='contained' onPress={() => setIsMenuVisible(true)}>
        <Plus size='$1' color='$color1' />
      </Button>

      {isMenuVisible && (
        <Animated.View
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(400)}
          style={styles.flexible}
        >
          <TouchableWithoutFeedback
            style={styles.flexible}
            onPress={() => setIsMenuVisible(false)}
          >
            <BlurView tint='dark' intensity={40} style={styles.blurView}>
              {menuList.map((menu, i) => (
                <TabTrigger key={i} name={menu.route}>
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleNavigate(menu.route)}
                  >
                    <H3>{t(menu.title)}</H3>
                  </TouchableOpacity>
                </TabTrigger>
              ))}
            </BlurView>
          </TouchableWithoutFeedback>
        </Animated.View>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  flexible: {
    flex: 1,
  },
  blurView: {
    flex: 1,
    gap: 28,
    paddingHorizontal: Layout.SPACE.CONTAINER_HORIZONTAL_PADDING * 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Layout.SPACE.CONTAINER_PADDING_BOTTOM / 1.5,
  },
})

export const WriteButton = memo(_WriteButton)
WriteButton.displayName = 'WriteButton'
