import { InferSelectModel } from 'drizzle-orm'

import { journals } from '../../db/schema'
import type { ISODateString, ISOMonthString } from './date.types'
import { Mood, MoodLevel } from './mood.types'
import { Prettify } from './util.types'

export type JournalModel = InferSelectModel<typeof journals>
export type SelectJournal = Prettify<
  Omit<JournalModel, 'moodId' | 'moodLevel'> & {
    mood: Mood
  }
>
export type Journal = Prettify<
  Omit<SelectJournal, 'localDate' | 'imageUri'> & {
    mood: Mood
    localDate: ISODateString
    imageUri: string[]
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
