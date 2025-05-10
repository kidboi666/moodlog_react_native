import { eq, sql } from 'drizzle-orm'
import { db } from '../../db'
import { journals } from '../../db/schema'

import {
  ISODateString,
  ISOMonthString,
  ISOString,
  JournalDraft,
  Maybe,
  SelectJournal,
  TimeRange,
} from '@/types'
import { DateUtils } from '@/utils'

export class JournalService {
  static async addJournal(draft: JournalDraft) {
    return db
      .insert(journals)
      .values({
        content: draft.content,
        moodId: draft.moodId,
        moodLevel: draft.moodLevel,
        imageUri: JSON.stringify(draft.imageUri),
      })
      .returning({ id: journals.id })
  }

  static async updateJournal(id: string, draft: JournalDraft) {
    return db
      .update(journals)
      .set({
        content: draft.content,
        moodId: draft.moodId,
        moodLevel: draft.moodLevel,
        imageUri: JSON.stringify(draft.imageUri),
      })
      .where(eq(journals.id, id))
  }

  static async getJournalById(journalId: string) {
    return db.query.journals.findFirst({
      where: eq(journals.id, journalId),
      with: {
        mood: true,
      },
    })
  }

  static async getJournals(timeRange: TimeRange, date: Maybe<ISOString>) {
    if (!date) return null
    let result: SelectJournal[]
    if (timeRange === TimeRange.MONTHLY) {
      const firstDate = DateUtils.getFirstDateString(date as ISODateString)
      const lastDate = DateUtils.getLastDateString(date as ISOMonthString)
      result = await db.query.journals.findMany({
        where: (journals, { lte, gte, and }) =>
          and(
            gte(journals.localDate, firstDate),
            lte(journals.localDate, lastDate),
          ),
        with: {
          mood: true,
        },
      })
    } else {
      result = await db.query.journals.findMany({
        where: (journals, { eq }) => eq(journals.localDate, date),
        with: {
          mood: true,
        },
      })
    }
    return result
  }

  static async deleteJournal(journalId: string) {
    await db.delete(journals).where(eq(journals.id, journalId))
  }
}
