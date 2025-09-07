import { AIPersonalityType } from '@/src/shared/types'

export const AI_PERSONALITIES = [
  {
    type: AIPersonalityType.RATIONAL,
    title: 'onboarding.personality.rational.title',
    description: 'onboarding.personality.rational.description',
    emoji: '🧠',
  },
  {
    type: AIPersonalityType.BALANCED,
    title: 'onboarding.personality.balanced.title',
    description: 'onboarding.personality.balanced.description',
    emoji: '⚖️',
  },
  {
    type: AIPersonalityType.COMPASSIONATE,
    title: 'onboarding.personality.compassionate.title',
    description: 'onboarding.personality.compassionate.description',
    emoji: '💝',
  },
] as const
