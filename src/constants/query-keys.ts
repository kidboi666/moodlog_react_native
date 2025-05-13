import { ISOString, Maybe, TimeRange } from '@/types'

export const queryKeys = {
  get: {
    journal: (id: string) => ['journal', id],
    journals: (timeRange: TimeRange, date?: ISOString | number) => [
      'journals',
      timeRange,
      date ?? null,
    ],
    totalCount: ['journal', 'totalCount'],
  },
}
