import { Mood, Moods } from '@/shared/types'

export class MoodService {
  static addMood(moods: Moods, newMood: Mood): Moods {
    if (moods[newMood.name]) {
      throw new Error('Mood already exists')
    }

    return {
      ...moods,
      [newMood.id]: newMood,
    }
  }

  static updateMood(moods: Moods, newMood: Mood): Moods {
    moods[newMood.id] = newMood
    return moods
  }

  static removeMood(moods: Moods, moodId: string): Moods {
    const newMoods = { ...moods }
    delete newMoods[moodId]
    return newMoods
  }
}
