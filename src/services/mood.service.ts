import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { moods } from '../../db/schema'

import { Mood, MoodDraft, Moods } from '@/types'

export class MoodService {
  static async addMood(moodDraft: MoodDraft) {
    await db.insert(moods).values({
      name: moodDraft.name,
      color: moodDraft.color,
    })
  }

  static async getMoodById(id: string) {
    const mood = await db.query.moods.findFirst({
      where: eq(moods.id, id),
    })
    if (!mood) throw new Error('Failed to get mood')
    return mood
  }

  static async getMoods() {
    const moods = await db.query.moods.findMany()
    if (!moods) throw new Error('Failed to get moods')
    return moods
  }

  static updateMood(moods: Moods, newMood: Mood) {}

  static removeMood(moods: Moods, moodId: string) {}
}
