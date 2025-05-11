import { ISOString, Maybe, TimeRange } from '@/types'

export const queryKeys = {
  get: {
    journal: (id: string) => ['journal', id],
    journals: (timeRange: TimeRange, date?: Maybe<ISOString>) => [
      'journals',
      timeRange,
      date ?? null,
    ],
  },
}
