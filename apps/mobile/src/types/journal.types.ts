import type {
  ISODateString,
  ISOMonthString,
  MonthKey,
} from '@/types/date.types'
import type { Mood, MoodType } from '@/types/mood.types'

export type Journal = {
  id: string
  content: string
  mood: Mood
  createdAt: string
  localDate: ISODateString // YYYY-MM-DD
  imageUri: string[]
}

export type Journals = Record<string, Journal>

export type Draft = {
  content: string
  mood?: Mood
  imageUri: string[]
}
/**
 * Types
 */
export type YearIndexes = Record<number, string[]>
export type MonthIndexes = Record<ISOMonthString, string[]>
export type DateIndexes = Record<ISODateString, string[]>
export type MoodIndexes = Record<MoodType, string[]>
export type SelectedJournals = Journal[] | ISODateString | null
export type SelectedJournal = Journal | null
export type JournalIndexes = {
  byYear: YearIndexes
  byMonth: MonthIndexes
  byDate: DateIndexes
  byMood: MoodIndexes
}
export type JournalStore = {
  journals: Journals
  indexes: JournalIndexes
}

export interface JournalStoreState {
  store: JournalStore
  selectedJournals: SelectedJournals
  selectedJournal: SelectedJournal

  isLoading: boolean
  error: any | null

  selectJournal: (journalId: string) => void
  selectJournals: (date: ISODateString | ISOMonthString | null) => void
  addJournal: (draft: Draft) => Promise<void>
  removeJournal: (id: string) => Promise<void>
  getCountForMonth: (year: number, month: number | MonthKey) => number
  getCountForDate: (
    year: number,
    month: number | string,
    date: number,
  ) => number
  getMoodForDate: (date: ISODateString) => any | null
  initJournals: () => Promise<void>
}
