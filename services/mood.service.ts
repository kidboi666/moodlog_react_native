import { Mood, Moods } from '@/types'

export const MoodService = {
  addMood: (moods: Moods, newMood: Mood): Moods => {
    if (moods[newMood.name]) {
      throw new Error('Mood already exists')
    }

    return {
      ...moods,
      [newMood.id]: newMood,
    }
  },

  updateMood: (moods: Moods, newMood: Mood): Moods => {
    moods[newMood.id] = newMood
    return moods
  },

  getRemainingMoodCount: (moods: Moods, moodLimit: number): number => {
    return Math.max(0, Object.keys(moods).length - moodLimit)
  },
}
