import { Stack, styled } from 'tamagui'

export const Overlay = styled(Stack, {
  flex: 1,
  position: 'absolute',
  t: 0,
  l: 0,
  r: 0,
  b: 0,
  z: 100_000_000,
  items: 'center',
  justify: 'center',
  bg: '$color4',
  opacity: 0.5,
})
