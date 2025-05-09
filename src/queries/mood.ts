import { queryOptions, useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Keyboard } from 'react-native'

import { MoodService } from '@/services'
import { MoodDraft, Moods } from '@/types'

export class MoodQueries {
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
}

export function useAddMood(onIsSuccessChange: (bool: boolean) => void) {
  const router = useRouter()
  return useMutation({
    mutationFn: (moodDraft: MoodDraft) => MoodService.addMood(moodDraft),
    onSuccess: () => {
      Keyboard.dismiss()
      router.replace('/(tabs)')
    },
  })
}
