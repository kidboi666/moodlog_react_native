import { Button, styled } from 'tamagui'

export const MonthItemButton = styled(Button, {
  unstyled: true,
  rounded: '$8',
  py: '$4',
  scale: 1,
  opacity: 0.4,
  position: 'relative',
  animation: 'lazy',
  animateOnly: ['opacity'],

  variants: {
    isSelected: {
      true: {
        opacity: 1,
      },
    },
  } as const,
})
