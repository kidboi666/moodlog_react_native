import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Keyboard } from 'react-native'

import { queryKeys } from '@/constants'
import { JournalService } from '@/services'
import {
  ISODateString,
  ISOMonthString,
  ISOString,
  JournalDraft,
  Maybe,
  TimeRange,
} from '@/types'
import { DateUtils } from '@/utils'

export class JournalQueries {
  static getJournalById(journalId: string) {
    return queryOptions({
      queryKey: queryKeys.get.journal(journalId),
      queryFn: () => JournalService.getJournalById(journalId),
      select: journal => ({
        ...journal,
        localDate: journal?.localDate as ISODateString,
        imageUri: journal?.imageUri
          ? (JSON.parse(journal.imageUri) as Maybe<string[]>)
          : null,
      }),
    })
  }

  static getJournals(timeRange: TimeRange, date: ISOString) {
    return queryOptions({
      queryKey: queryKeys.get.journals(timeRange, date),
      queryFn: () => JournalService.getJournals(timeRange, date),
      select: journals =>
        journals?.map(journal => ({
          ...journal,
          localDate: journal.localDate as ISODateString,
          imageUri: journal.imageUri
            ? (JSON.parse(journal.imageUri) as Maybe<string[]>)
            : null,
        })),
    })
  }
}

export function useAddJournal() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (draft: JournalDraft) => JournalService.addJournal(draft),
    onError: error => {
      console.error('error', error)
    },
    onSuccess: data => {
      router.replace({
        pathname: '/(tabs)/journal/[journalId]',
        params: { journalId: data[0].id, isNewJournal: 'true' },
      })
    },
    onSettled: data => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.get.journals(
          TimeRange.DAILY,
          data?.[0].localDate as ISODateString,
        ),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.get.journals(
          TimeRange.MONTHLY,
          data?.[0].localDate.slice(0, 7) as ISOMonthString,
        ),
      })
    },
  })
}

export function useDeleteJournal(hideBottomSheet: () => void, date: ISOString) {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (journalId: string) => JournalService.deleteJournal(journalId),
    onError: error => {
      console.error('error', error)
    },
    onSuccess: () => {
      Keyboard.dismiss()
      hideBottomSheet()
      router.replace('/(tabs)')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.get.journals(TimeRange.DAILY, date),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.get.journals(TimeRange.MONTHLY, date),
      })
    },
  })
}
