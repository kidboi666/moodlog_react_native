import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Keyboard } from 'react-native'

import {
  addJournal,
  deleteJournal,
  getJournalById,
  getJournalsByDate,
  getJournalsByMonth,
  getJournalsByYear,
} from '@/src/data/services'
import { QueryKeys } from '@/src/shared/constants'
import {
  ISODateString,
  ISOMonthString,
  ISOString,
  JournalDraft,
  JournalModel,
  Maybe,
} from '@/src/shared/types'

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
      queryKey: QueryKeys.get.journal(journalId),
      queryFn: () => getJournalById(journalId),
      select: journal => {
        if (!journal) return
        return {
          ...mappingType(journal),
        }
      },
      enabled: !!journalId,
    })
  },

  getJournalsByDate: (date: ISODateString) => {
    return queryOptions({
      queryKey: QueryKeys.get.journals(date),
      queryFn: () => getJournalsByDate(date),
      select: journals =>
        journals?.map(journal => ({
          ...mappingType(journal),
        })),
    })
  },

  getJournalsByMonth: (month: ISOMonthString) => {
    return queryOptions({
      queryKey: QueryKeys.get.journals(month),
      queryFn: () => getJournalsByMonth(month),
      select: journals =>
        journals?.map(journal => ({
          ...mappingType(journal),
        })),
    })
  },

  getJournalsByYear: (year: number) => {
    return queryOptions({
      queryKey: QueryKeys.get.journals(year),
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
        pathname: '/(journal)/[journalId]',
        params: { journalId: data[0].id, source: 'create' },
      })
    },
    onSettled: data => {
      const keys = [
        QueryKeys.get.journals(data?.[0].localDate as ISODateString),
        QueryKeys.get.journals(
          data?.[0].localDate?.slice(0, 7) as ISOMonthString,
        ),
      ]
      keys.forEach(queryKey => queryClient.invalidateQueries({ queryKey }))
    },
  })
}

export function useDeleteJournal(
  hideBottomSheet: () => void,
  date?: ISOString,
) {
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
    onSettled: (_, __, journalId) => {
      const keys = [
        QueryKeys.get.journals(date),
        QueryKeys.get.journal(journalId),
      ]
      keys.forEach(queryKey => queryClient.invalidateQueries({ queryKey }))
    },
  })
}
