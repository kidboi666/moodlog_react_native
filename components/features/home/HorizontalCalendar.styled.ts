import { Button, View, XStack, YStack, styled } from 'tamagui'

import { CALENDAR_SCROLL_SIZE } from '@/constants'

import { BaseText } from '@/components/shared/BaseText'
import { MOUNT_STYLE, MOUNT_STYLE_KEY } from '@/styles/animations'

export const CalendarContainer = styled(XStack, {
  animation: 'quick',
  animateOnly: MOUNT_STYLE_KEY,
  enterStyle: MOUNT_STYLE,
  flex: 1,
  justify: 'center',
  rounded: '$4',
  items: 'center',
})

export const DateContainer = styled(View, {
  py: '$3',
  width: CALENDAR_SCROLL_SIZE,
  rounded: '$4',
  borderColor: '$gray1',

  variants: {
    isSelected: {
      true: {
        bg: '$gray5',
      },
    },
    isToday: {
      true: {
        borderWidth: 1,
      },
    },
  } as const,
})

export const DateWrapper = styled(Button, {
  unstyled: true,
  items: 'center',
})

export const DateTextWrapper = styled(YStack, {
  gap: '$2',
  items: 'center',
})

export const DayText = styled(BaseText, {
  color: '$gray9',

  variants: {
    isSelected: {
      true: {
        color: '$gray12',
      },
    },
  } as const,
})

export const DateText = styled(BaseText, {
  fontWeight: '800',
  fontSize: '$6',

  variants: {
    futureDateColor: {
      ':string': color => {
        return { color }
      },
    },
  } as const,
})
