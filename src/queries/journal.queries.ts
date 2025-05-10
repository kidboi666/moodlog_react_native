import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Keyboard } from 'react-native'

import { queryKeys } from '@/constants'
import { JournalService } from '@/services'
import { ISOString, Journal, JournalDraft, Maybe, TimeRange } from '@/types'

export class JournalQueries {
  static getJournalById(journalId: string) {
    return queryOptions({
      queryKey: queryKeys.get.journal(journalId),
      queryFn: () => JournalService.getJournalById(journalId),
      select: journal => ({
        ...journal,
        imageUri: journal?.imageUri ? JSON.parse(journal.imageUri) : null,
      }),
    })
  }

  static getJournals(timeRange: TimeRange, localDate: Maybe<ISOString>) {
    return queryOptions({
      queryKey: queryKeys.get.journals(timeRange),
      queryFn: () => JournalService.getJournals(timeRange, localDate),
      select: journals =>
        journals?.map(journal => ({
          ...journal,
          imageUri: journal.imageUri ? JSON.parse(journal.imageUri) : null,
        })) as Journal[],
    })
  }
}

export function useAddJournal() {
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
  })
}

export function useDeleteJournal(hideBottomSheet: () => void) {
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
        queryKey: queryKeys.get.journals(TimeRange.DAILY),
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.get.journals(TimeRange.MONTHLY),
      })
    },
  })
}
