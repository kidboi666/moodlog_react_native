import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { moods } from '../../db/schema'

import { MoodDraft } from '@/types'

export class MoodService {
  static async addMood(moodDraft: MoodDraft) {
    return db
      .insert(moods)
      .values({
        name: moodDraft.name,
        color: moodDraft.color,
      })
      .onConflictDoNothing()
  }

  static async updateMood(
    id: string,
    newMood: Partial<Omit<typeof moods.$inferInsert, 'id' | 'createdAt'>>,
  ) {
    return db
      .update(moods)
      .set({
        name: newMood.name,
        color: newMood.color,
      })
      .where(eq(moods.id, id))
  }

  static async deleteMood(id: string) {
    return db.delete(moods).where(eq(moods.id, id))
  }

  static async getMoods() {
    return db.query.moods.findMany()
  }

  static async getMoodById(id: string) {
    return db.query.moods.findFirst({
      where: eq(moods.id, id),
    })
  }

  static async getMoodByName(name: string) {
    return db.query.moods.findFirst({
      where: eq(moods.name, name),
    })
  }
}
