import { db } from '@/db'
import { journals } from '@/db/schema'
import { eq } from 'drizzle-orm'

import {
  ISODateString,
  ISOMonthString,
  Journal,
  JournalDraft,
  LocalDate,
} from '@/shared/types'
import { DateUtils } from '@/shared/utils'

export class JournalService {
  static async createJournal(draft: JournalDraft) {
    const journalId = await db
      .insert(journals)
      .values({
        content: draft.content,
        moodId: draft.moodId,
        moodLevel: draft.moodLevel,
        imageUri: JSON.stringify(draft.imageUri),
        localDate: draft.localDate,
      })
      .returning({ id: journals.id })
    if (!journalId) throw new Error('Failed to create journal')
    return journalId
  }

  static async updateJournal(id: string, draft: Partial<JournalDraft>) {
    return db
      .update(journals)
      .set({
        content: draft.content,
        moodId: draft.moodId,
        moodLevel: draft.moodLevel,
        imageUri: JSON.stringify(draft.imageUri),
        localDate: draft.localDate,
      })
      .where(eq(journals.id, id))
  }

  static async getJournal(journalId: string) {
    const journal = await db.query.journals.findFirst({
      where: eq(journals.id, journalId),
      with: { moods: true },
    })
    if (!journal) throw new Error('Failed to get journal')
    return journal
  }

  static async getJournals(
    timeRange: 'daily' | 'monthly',
    localDate: LocalDate,
  ) {
    let journals: Journal[]
    if (timeRange === 'monthly') {
      const firstDate = DateUtils.getFirstDateString(localDate as ISODateString)
      const lastDate = DateUtils.getLastDateString(localDate as ISOMonthString)
      journals = await db.query.journals.findMany({
        where: (journals, { lte, gte, and }) =>
          and(
            gte(journals.localDate, firstDate),
            lte(journals.localDate, lastDate),
          ),
        orderBy: (journals, { asc }) => [asc(journals.localDate)],
        with: { moods: true },
      })
    } else {
      journals = await db.query.journals.findMany({
        where: (journals, { eq }) => eq(journals.localDate, localDate),
        orderBy: (journals, { asc }) => [asc(journals.localDate)],
        with: { moods: true },
      })
    }
    return journals
  }

  static async removeJournal(journalId: string) {
    await db.delete(journals).where(eq(journals.id, journalId))
  }
}
