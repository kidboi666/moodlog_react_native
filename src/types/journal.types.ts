import { InferSelectModel } from 'drizzle-orm'

import { journals } from '../../db/sqlite/schema'
import type { ISODateString, ISOMonthString } from './date.types'
import { Mood, MoodLevel } from './mood.types'
import { Maybe, Prettify } from './util.types'

// db schema
export type JournalModel = InferSelectModel<typeof journals>
// joined schema
export type SelectJournal = Prettify<JournalModel & { mood: Mood }>
// prettified schema
export type Journal = Prettify<
  Omit<SelectJournal, 'imageUri'> & {
    localDate: ISODateString
    imageUri: Maybe<string[]>
  }
>
export type JournalDraft = {
  content: string
  imageUri: string[]
  moodId: string
  moodLevel: MoodLevel
}
export type DateJournals = Record<ISODateString, Journal[]>
export type MonthJournals = Record<ISOMonthString, Journal[]>
export type DateJournalSelection = Journal[] | ISODateString | null
export type MonthJournalSelection = Journal[] | ISOMonthString | null
export type SelectedJournal = Journal | null
export type SelectedJournals = DateJournalSelection | MonthJournalSelection
