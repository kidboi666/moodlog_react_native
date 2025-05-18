import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Keyboard } from 'react-native'

import { queryKeys } from '@/constants'
import {
  addJournal,
  deleteJournal,
  getJournalById,
  getJournalsByDate,
  getJournalsByMonth,
  getJournalsByYear,
} from '@/services'
import {
  ISODateString,
  ISOMonthString,
  ISOString,
  JournalDraft,
  JournalModel,
  Maybe,
  TimeRange,
} from '@/types'

const mappingType = (journal: JournalModel) => {
  return {
    ...journal,
    localDate: journal?.localDate as ISODateString,
    imageUri: journal?.imageUri
      ? (JSON.parse(journal.imageUri) as Maybe<string[]>)
      : null,
  }
}
export const JournalQueries = {
  getJournalById: (journalId: number) => {
    return queryOptions({
      queryKey: queryKeys.get.journal(journalId),
      queryFn: () => getJournalById(journalId),
      select: journal => ({
        ...mappingType(journal),
      }),
      enabled: !!journalId,
    })
  },

  getJournalsByDate: (date: ISODateString) => {
    return queryOptions({
      queryKey: queryKeys.get.journals(date),
      queryFn: () => getJournalsByDate(date),
      select: journals =>
        journals?.map(journal => ({
          ...mappingType(journal),
        })),
    })
  },

  getJournalsByMonth: (month: ISOMonthString) => {
    return queryOptions({
      queryKey: queryKeys.get.journals(month),
      queryFn: () => getJournalsByMonth(month),
      select: journals =>
        journals?.map(journal => ({
          ...mappingType(journal),
        })),
    })
  },

  getJournalsByYear: (year: number) => {
    return queryOptions({
      queryKey: queryKeys.get.journals(year),
      queryFn: () => getJournalsByYear(year),
      select: journals =>
        journals?.map(journal => ({
          ...mappingType(journal),
        })),
    })
  },
}

export function useAddJournal() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (draft: JournalDraft) => addJournal(draft),
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
    mutationFn: (journalId: number) => deleteJournal(journalId),
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
