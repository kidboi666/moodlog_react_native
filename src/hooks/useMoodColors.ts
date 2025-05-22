import { MoodLevel } from '@/types'
import { useColors } from './useColors'

export const useMoodColors = () => {
  const { tokens, utils } = useColors()

  const getMoodColor = (moodName: string, level: MoodLevel) => {
    const baseColor =
      tokens.mood[moodName.toLowerCase() as keyof typeof tokens.mood] ||
      tokens.neutral[500]

    switch (level) {
      case MoodLevel.ZERO:
        return utils.withOpacity(baseColor, 0.4)
      case MoodLevel.HALF:
        return utils.withOpacity(baseColor, 0.7)
      case MoodLevel.FULL:
        return baseColor
      default:
        return baseColor
    }
  }

  const getMoodGradient = (moodName: string) => {
    const baseColor =
      tokens.mood[moodName.toLowerCase() as keyof typeof tokens.mood] ||
      tokens.neutral[500]
    return [
      utils.withOpacity(baseColor, 0.2),
      utils.withOpacity(baseColor, 0.8),
      baseColor,
    ]
  }

  return {
    getMoodColor,
    getMoodGradient,
    moodColors: tokens.mood,
  }
}
