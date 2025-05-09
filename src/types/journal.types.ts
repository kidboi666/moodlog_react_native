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
export type DateJournals = {
  [date: ISODateString]: Journal[]
}
export type MonthJournals = {
  [month: ISOMonthString]: Journal[]
}
export type JournalDraft = {
  content: string
  moodId: string
  moodLevel: MoodLevel
  imageUri: string[]
}
export type SelectedJournalsByDate = Journal[] | ISODateString | null
export type SelectedJournalsByMonth = Omit<
  SelectedJournalsByDate,
  'ISODateString'
> &
  ISOMonthString
export type SelectedJournal = Journal | null
export type SelectedJournals = SelectedJournalsByDate | SelectedJournalsByMonth
