import { Platform } from 'react-native'
import { XStack, styled } from 'tamagui'

export const TabBarContainer = styled(XStack, {
  b: 0,
  l: 0,
  r: 0,
  bg: '$color5',
  elevation: 10,
  borderTopRightRadius: '$12',
  borderTopLeftRadius: '$12',
  width: '100%',
})

export const Container = styled(XStack, {
  flex: 1,
  pt: Platform.OS === 'ios' ? '$4' : undefined,
  flexDirection: 'row',
  justify: 'space-evenly',
  items: 'center',
})
