import { and, eq, gte, lte } from 'drizzle-orm'
import { sqliteDb } from '../../db/sqlite'
import { journals } from '../../db/sqlite/schema'

import { getGemini } from '@/lib'
import { ISODateString, ISOMonthString, JournalDraft, MoodName } from '@/types'
import {
  getFirstISODateFromYear,
  getISODateFromMonthString,
  getLastDate,
  getLastISODateFromYear,
} from '@/utils'

export async function addJournal(draft: JournalDraft) {
  const result = await sqliteDb
    .insert(journals)
    .values({
      content: draft.content,
      moodName: draft.moodName,
      imageUri: JSON.stringify(draft.imageUri),
      aiResponseEnabled: draft.aiResponseEnabled,
    })
    .returning({ id: journals.id, localDate: journals.localDate })

  if (draft.aiResponseEnabled && draft.content && result[0]) {
    await generateAiResponse(
      result[0].id,
      result[0].localDate as ISODateString,
      draft.content,
      draft.moodName as MoodName,
    )
  }

  return result
}

export async function generateAiResponse(
  journalId: number,
  localDate: ISODateString,
  content: string,
  moodName: MoodName,
) {
  const { canGenerateResponse } = await getTodayAiResponseStatus(localDate)

  if (!canGenerateResponse) {
    return
  }

  const gemini = getGemini()
  const response = await gemini.generateJournalResponse(content, moodName)

  if (response.text) {
    await sqliteDb
      .update(journals)
      .set({
        aiResponse: response.text,
        aiResponseAt: new Date().toISOString(),
      })
      .where(eq(journals.id, journalId))
  }
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

export async function getTodayAiResponseStatus(date: ISODateString) {
  const todayJournals = await sqliteDb.query.journals.findMany({
    where: eq(journals.localDate, date),
    columns: {
      aiResponse: true,
      aiResponseEnabled: true,
    },
  })

  const hasAiResponse = todayJournals.some(journal => journal.aiResponse)
  const hasAiEnabledJournal = todayJournals.some(
    journal => journal.aiResponseEnabled,
  )

  return {
    hasAiResponse,
    hasAiEnabledJournal,
    canGenerateResponse: !hasAiResponse && hasAiEnabledJournal,
  }
}
