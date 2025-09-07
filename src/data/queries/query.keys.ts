import { ISOString } from '@/src/shared/types'

export const QueryKeys = {
  get: {
    journal: (id: number) => ['journal', id],
    journals: (date?: ISOString | number) => ['journals', date ?? null],
    totalCount: ['journal', 'totalCount'],
    userInfo: (userId: string) => ['userInfo', userId],
    aiResponse: (content: string, moodName: string) => [
      'aiResponse',
      content,
      moodName,
    ],
    aiResponseStatus: (todayString: string) => [
      'ai-response-status',
      todayString,
    ],
  },
}
