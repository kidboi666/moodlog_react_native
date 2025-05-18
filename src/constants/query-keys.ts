import { ISOString, Maybe, TimeRange } from '@/types'

export const queryKeys = {
  get: {
    journal: (id: number) => ['journal', id],
    journals: (timeRange: TimeRange, date?: ISOString | number) => [
      'journals',
      timeRange,
      date ?? null,
    ],
    totalCount: ['journal', 'totalCount'],
    userInfo: ['userInfo'],
  },
}
