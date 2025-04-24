import { JournalMood, MoodLevel } from '@/shared/types'
import { hexToRgba } from '@/shared/utils'
import { useMood } from '@/store'

export const useMoodColor = (journalMood: JournalMood) => {
  const moods = useMood(state => state.moods)
  const { name, level } = journalMood
  const moodColor = moods[name].color

  switch (level) {
    case MoodLevel.HALF: {
      return hexToRgba(moodColor, 0.7)
    }
    case MoodLevel.ZERO: {
      return hexToRgba(moodColor, 0.4)
    }
    default:
      return hexToRgba(moodColor, 1)
  }
}
