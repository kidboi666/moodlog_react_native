import { ISOString } from '@/src/types'

export const queryKeys = {
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
