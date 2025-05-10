import { TimeRange } from '@/types'

export const queryKeys = {
  get: {
    journal: (id: string) => ['journal', id],
    journals: (timeRange: TimeRange) => ['journals', timeRange],
  },
}
