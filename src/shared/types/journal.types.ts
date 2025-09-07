import { InferSelectModel } from 'drizzle-orm'

import { journals } from '@/src/data/database/sqlite/schema'
import { MoodName } from '@/src/shared/types/mood.types'
import type { ISODateString, ISOMonthString } from './date.types'
import { Maybe, Prettify } from './util.types'

// db schema
export type JournalModel = InferSelectModel<typeof journals>
// prettified schema
export type Journal = Prettify<
  Omit<JournalModel, 'imageUri'> & {
    localDate: ISODateString
    imageUri: Maybe<string[]>
  }
>
export type JournalDraft = {
  content: string
  moodName: MoodName
  imageUri: string[]
  aiResponseEnabled: boolean
}
export type DateJournals = Record<ISODateString, Journal[]>
export type MonthJournals = Record<ISOMonthString, Journal[]>
export type DateJournalSelection = Journal[] | ISODateString | null
export type MonthJournalSelection = Journal[] | ISOMonthString | null
export type SelectedJournal = Journal | null
export type SelectedJournals = DateJournalSelection | MonthJournalSelection
