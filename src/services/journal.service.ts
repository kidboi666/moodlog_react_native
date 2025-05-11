import { and, eq, gte, lte } from 'drizzle-orm'
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
      .returning({ id: journals.id, localDate: journals.localDate })
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

  static async getJournals(
    timeRange: TimeRange,
    date: ISOString,
  ): Promise<SelectJournal[]> {
    let result: SelectJournal[]
    if (timeRange === TimeRange.MONTHLY) {
      const monthDate = date as ISOMonthString
      const firstDate = DateUtils.getISODateFromMonthString(monthDate, 1)
      const lastDate = DateUtils.getLastDate(monthDate)
      result = await db.query.journals.findMany({
        where: and(
          gte(journals.localDate, firstDate),
          lte(journals.localDate, lastDate),
        ),
        with: {
          mood: true,
        },
      })
    } else if (timeRange === TimeRange.DAILY) {
      result = await db.query.journals.findMany({
        where: eq(journals.localDate, date),
        with: {
          mood: true,
        },
      })
    } else {
      result = await db.query.journals.findMany({
        with: { mood: true },
      })
    }
    return result
  }

  static async deleteJournal(journalId: string) {
    await db.delete(journals).where(eq(journals.id, journalId))
  }
}
