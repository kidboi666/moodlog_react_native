import { and, eq, gte, lte } from 'drizzle-orm'
import { sqliteDb } from '../../db/sqlite'
import { journals } from '../../db/sqlite/schema'

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
  return sqliteDb
    .insert(journals)
    .values({
      content: draft.content,
      moodId: draft.moodId,
      moodLevel: draft.moodLevel,
      imageUri: JSON.stringify(draft.imageUri),
    })
    .returning({ id: journals.id, localDate: journals.localDate })
}

export async function updateJournal(id: number, draft: JournalDraft) {
  return sqliteDb
    .update(journals)
    .set({
      content: draft.content,
      moodId: draft.moodId,
      moodLevel: draft.moodLevel,
      imageUri: JSON.stringify(draft.imageUri),
    })
    .where(eq(journals.id, id))
}

export async function getJournalById(journalId: number) {
  return sqliteDb.query.journals.findFirst({
    where: eq(journals.id, journalId),
    with: {
      mood: true,
    },
  })
}

export async function getJournalsByDate(date: ISODateString) {
  return sqliteDb.query.journals.findMany({
    where: eq(journals.localDate, date as ISODateString),
    with: {
      mood: true,
    },
  })
}

export async function getJournalsByMonth(month: ISOMonthString) {
  const firstDate = getISODateFromMonthString(month, 1)
  const lastDate = getLastDate(month)
  return sqliteDb.query.journals.findMany({
    where: and(
      gte(journals.localDate, firstDate),
      lte(journals.localDate, lastDate),
    ),
    with: {
      mood: true,
    },
  })
}

export async function getJournalsByYear(year: number) {
  const firstDate = getFirstISODateFromYear(year)
  const lastDate = getLastISODateFromYear(year)
  return sqliteDb.query.journals.findMany({
    where: and(
      gte(journals.localDate, firstDate),
      lte(journals.localDate, lastDate),
    ),
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
    result = await sqliteDb.query.journals.findMany({
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
    result = await sqliteDb.query.journals.findMany({
      where: and(
        gte(journals.localDate, firstDate),
        lte(journals.localDate, lastDate),
      ),
      with: {
        mood: true,
      },
    })
  } else if (timeRange === TimeRange.DAILY) {
    result = await sqliteDb.query.journals.findMany({
      where: eq(journals.localDate, date as ISODateString),
      with: {
        mood: true,
      },
    })
    console.log('데일리', result)
  } else {
    result = await sqliteDb.query.journals.findMany({
      with: { mood: true },
    })
  }
  console.log(result)
  return result
}

export async function deleteJournal(journalId: number) {
  await sqliteDb.delete(journals).where(eq(journals.id, journalId))
}
