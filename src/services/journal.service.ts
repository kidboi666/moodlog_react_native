import { and, eq, gte, lte } from 'drizzle-orm'
import { sqliteDb } from '../../db/sqlite'
import { journals } from '../../db/sqlite/schema'

import { ISODateString, ISOMonthString, JournalDraft } from '@/types'
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
      moodName: draft.moodName,
      imageUri: JSON.stringify(draft.imageUri),
    })
    .returning({ id: journals.id, localDate: journals.localDate })
}

export async function updateJournal(id: number, draft: JournalDraft) {
  return sqliteDb
    .update(journals)
    .set({
      content: draft.content,
      moodName: draft.moodName,
      imageUri: JSON.stringify(draft.imageUri),
    })
    .where(eq(journals.id, id))
}

export async function getJournalById(journalId: number) {
  return sqliteDb.query.journals.findFirst({
    where: eq(journals.id, journalId),
  })
}

export async function getJournalsByDate(date: ISODateString) {
  return sqliteDb.query.journals.findMany({
    where: eq(journals.localDate, date as ISODateString),
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
  })
}

export async function deleteJournal(journalId: number) {
  await sqliteDb
    .delete(journals)
    .where(eq(journals.id, journalId))
    .returning({ id: journals.id, localDate: journals.localDate })
}
