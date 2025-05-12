import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { moods } from '../../db/schema'

import { MoodDraft } from '@/types'

export async function addMood(moodDraft: MoodDraft) {
  return db
    .insert(moods)
    .values({
      name: moodDraft.name,
      color: moodDraft.color,
    })
    .onConflictDoNothing()
}

export async function updateMood(
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

export async function deleteMood(id: string) {
  return db.delete(moods).where(eq(moods.id, id))
}

export async function getMoods() {
  return db.query.moods.findMany()
}

export async function getMoodById(id: string) {
  return db.query.moods.findFirst({
    where: eq(moods.id, id),
  })
}

export async function getMoodByName(name: string) {
  return db.query.moods.findFirst({
    where: eq(moods.name, name),
  })
}
