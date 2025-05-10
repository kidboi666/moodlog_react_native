import { queryOptions, useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Keyboard } from 'react-native'

import { MoodService } from '@/services'
import { MoodDraft, Moods } from '@/types'
import { moods } from '../../db/schema'

/**
 * Get
 */
export class MoodQueries {
  /**
   * 현재 감정 전부 가져오기
   */
  static getMoods() {
    return queryOptions({
      queryKey: ['moods'],
      queryFn: () => MoodService.getMoods(),
      select: data => {
        return data.reduce((acc, mood) => {
          acc[mood.id] = mood
          return acc
        }, {} as Moods)
      },
    })
  }

  /**
   * id로 감정 가져오기
   */
  static getMoodById(id: string) {
    return queryOptions({
      queryKey: ['moods', id],
      queryFn: () => MoodService.getMoodById(id),
    })
  }

  /**
   * name 으로 감정 가져오기
   */
  static getMoodByName(name: string) {
    return queryOptions({
      queryKey: ['moods', name],
      queryFn: () => MoodService.getMoodByName(name),
    })
  }
}

/**
 * Insert 새 감정 추가하기
 */
export function useAddMood() {
  const router = useRouter()
  return useMutation({
    mutationFn: (moodDraft: MoodDraft) => MoodService.addMood(moodDraft),
    onError: (error, variables) => {
      console.error('error', error)
    },
    onSuccess: () => {
      Keyboard.dismiss()
      router.replace('/(tabs)')
    },
  })
}

/**
 * Update 감정 수정하기
 */
export function useUpdateMood() {
  return useMutation({
    mutationFn: (args: {
      id: string
      moodDraft: Partial<Omit<typeof moods.$inferInsert, 'id' | 'createdAt'>>
    }) => MoodService.updateMood(args.id, args.moodDraft),
    onError: (error, variables) => {
      console.error('error', error)
    },
    onSuccess: () => {
      Keyboard.dismiss()
    },
  })
}

export function useDeleteMood() {
  return useMutation({
    mutationFn: (id: string) => MoodService.deleteMood(id),
  })
}
