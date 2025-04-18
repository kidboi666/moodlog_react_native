import { Platform } from 'react-native'
import { XStack, styled } from 'tamagui'

import {
  CONTAINER_HORIZONTAL_PADDING,
  CONTAINER_VERTICAL_PADDING,
} from '@/constants'

export const HeaderContainer = styled(XStack, {
  py: CONTAINER_VERTICAL_PADDING,
  pt:
    Platform.OS === 'ios'
      ? CONTAINER_HORIZONTAL_PADDING
      : CONTAINER_HORIZONTAL_PADDING * 2,
  justify: 'space-between',
  items: 'center',

  variants: {
    topEdge: {
      ':number': mt => {
        return { mt }
      },
    },
    bottomEdge: {
      ':number': mb => {
        return { mb }
      },
    },
  } as const,
})
