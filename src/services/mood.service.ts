import { eq } from 'drizzle-orm'
import { sqliteDb } from '../../db/sqlite'
import { moods } from '../../db/sqlite/schema'

import { MoodDraft } from '@/types'

export async function addMood(moodDraft: MoodDraft) {
  return sqliteDb
    .insert(moods)
    .values({
      name: moodDraft.name,
      color: moodDraft.color,
    })
    .onConflictDoNothing()
}

export async function updateMood(
  id: number,
  newMood: Partial<Omit<typeof moods.$inferInsert, 'id' | 'createdAt'>>,
) {
  return sqliteDb
    .update(moods)
    .set({
      name: newMood.name,
      color: newMood.color,
    })
    .where(eq(moods.id, id))
}

export async function deleteMood(id: number) {
  return sqliteDb.delete(moods).where(eq(moods.id, id))
}

export async function getMoods() {
  return sqliteDb.query.moods.findMany()
}

export async function getMoodById(id: number) {
  return sqliteDb.query.moods.findFirst({
    where: eq(moods.id, id),
  })
}

export async function getMoodByName(name: string) {
  return sqliteDb.query.moods.findFirst({
    where: eq(moods.name, name),
  })
}
