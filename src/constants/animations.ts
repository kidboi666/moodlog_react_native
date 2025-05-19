import { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'

export const MOUNT_STYLE = {
  opacity: 0,
  scale: 0.92,
} as const

export const PRESS_STYLE = {
  bg: '$backgroundPress',
  scale: 0.92,
  borderColor: '$borderColorPress',
  color: '$colorPress',
} as const

export const MOUNT_STYLE_KEY = ['opacity', 'scale']

export const PRESS_STYLE_KEY = [
  'backgroundColor',
  'borderColor',
  'color',
  'transform',
]

export const ANIMATION_CONFIG = {
  '100ms': {
    type: 'timing',
    duration: 100,
  },
  bouncy: {
    damping: 9,
    mass: 0.9,
    stiffness: 150,
  },
  lazy: {
    damping: 18,
    stiffness: 50,
  },
  medium: {
    damping: 15,
    stiffness: 120,
    mass: 1,
  },
  slow: {
    damping: 15,
    stiffness: 40,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  tooltip: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
}

export const DelayMS = {
  ANIMATION: {
    QUICK: [100, 200, 300, 400],
    MEDIUM: [300, 600, 900, 1200],
    LONG: [1000, 2000, 3000, 4000],
  },
  ROUTE: 300,
  WAIT: {
    WRITE_MOOD: 3500,
  },
} as const
