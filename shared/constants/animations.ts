import { BounceInUp, Easing } from 'react-native-reanimated'

export const MOUNT_STYLE = {
  opacity: 0,
  scale: 0.92,
} as const

export const PRESS_STYLE = {
  bg: '$backgroundFocus',
  borderColor: '$borderColorPress',
  color: '$colorPress',
  scale: 0.92,
} as const

export const MOUNT_STYLE_KEY = ['opacity', 'scale']

export const PRESS_STYLE_KEY = [
  'backgroundColor',
  'borderColor',
  'color',
  'scale',
]

export const DEFAULT_BOUNCE_IN_UP = BounceInUp.duration(700).easing(
  Easing.inOut(Easing.quad),
)
