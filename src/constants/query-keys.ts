import { ISOString, Maybe, TimeRange } from '@/types'

export const queryKeys = {
  get: {
    journal: (id: number) => ['journal', id],
    journals: (date?: ISOString | number) => ['journals', date ?? null],
    totalCount: ['journal', 'totalCount'],
    userInfo: ['userInfo'],
  },
}
