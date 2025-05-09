import { eq, sql } from 'drizzle-orm'
import { journals } from '../../db/schema'

import {
  ISODateString,
  ISOMonthString,
  ISOString,
  Journal,
  JournalDraft,
  Maybe,
  SelectJournal,
  TimeRange,
} from '@/types'
import { DateUtils } from '@/utils'
import { db } from '../../db'

export class JournalService {
  static async addJournal(draft: JournalDraft) {
    const journalId = await db
      .insert(journals)
      .values({
        content: draft.content,
        moodId: draft.moodId,
        moodLevel: draft.moodLevel,
        imageUri: JSON.stringify(draft.imageUri),
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
      })
      .where(eq(journals.id, id))
  }

  static async getJournalById(journalId: string) {
    const journal = await db.query.journals.findFirst({
      columns: {
        moodId: false,
        moodLevel: false,
      },
      where: eq(journals.id, journalId),
      with: {
        mood: {
          extras: {
            level: sql<string>`${journals.moodLevel}`.as('level'),
          },
        },
      },
    })
    if (!journal) throw new Error('Failed to get journal')
    return journal
  }

  static async getJournals(timeRange: TimeRange, date: Maybe<ISOString>) {
    if (!date) return null
    let result: SelectJournal[]
    if (timeRange === 'monthly') {
      const firstDate = DateUtils.getFirstDateString(date as ISODateString)
      const lastDate = DateUtils.getLastDateString(date as ISOMonthString)
      result = await db.query.journals.findMany({
        columns: {
          moodId: false,
          moodLevel: false,
        },
        where: (journals, { lte, gte, and }) =>
          and(
            gte(journals.localDate, firstDate),
            lte(journals.localDate, lastDate),
          ),
        orderBy: (journals, { asc }) => [asc(journals.localDate)],
        with: {
          mood: {
            extras: {
              level: sql<string>`${journals.moodLevel}`.as('level'),
            },
          },
        },
      })
    } else {
      result = await db.query.journals.findMany({
        columns: {
          moodId: false,
          moodLevel: false,
        },
        where: (journals, { eq }) => eq(journals.localDate, date),
        orderBy: (journals, { asc }) => [asc(journals.localDate)],
        with: {
          mood: {
            extras: {
              level: sql<string>`${journals.moodLevel}`.as('level'),
            },
          },
        },
      })
    }
    if (!result) throw new Error('Failed to get journal')
    return result as unknown as Journal[]
  }

  static async removeJournal(journalId: string) {
    await db.delete(journals).where(eq(journals.id, journalId))
  }
}
