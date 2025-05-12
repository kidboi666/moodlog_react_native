import { and, eq, gte, lte } from 'drizzle-orm'
import { db } from '../../db'
import { journals } from '../../db/schema'

import {
  ISODateString,
  ISOMonthString,
  ISOString,
  JournalDraft,
  SelectJournal,
  TimeRange,
} from '@/types'
import {
  getFirstISODateFromYear,
  getISODateFromMonthString,
  getLastDate,
  getLastISODateFromYear,
} from '@/utils'

export async function addJournal(draft: JournalDraft) {
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

export async function updateJournal(id: string, draft: JournalDraft) {
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

export async function getJournalById(journalId: string) {
  return db.query.journals.findFirst({
    where: eq(journals.id, journalId),
    with: {
      mood: true,
    },
  })
}

export async function getJournals(
  timeRange: TimeRange,
  date: ISOString | number,
): Promise<SelectJournal[]> {
  let result: SelectJournal[]
  if (timeRange === TimeRange.YEARLY) {
    const yearDate = date as number
    const firstDate = getFirstISODateFromYear(yearDate)
    const lastDate = getLastISODateFromYear(yearDate)
    result = await db.query.journals.findMany({
      where: and(
        gte(journals.localDate, firstDate),
        lte(journals.localDate, lastDate),
      ),
      with: {
        mood: true,
      },
    })
  } else if (timeRange === TimeRange.MONTHLY) {
    const monthDate = date as ISOMonthString
    const firstDate = getISODateFromMonthString(monthDate, 1)
    const lastDate = getLastDate(monthDate)
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
      where: eq(journals.localDate, date as ISODateString),
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

export async function deleteJournal(journalId: string) {
  await db.delete(journals).where(eq(journals.id, journalId))
}
