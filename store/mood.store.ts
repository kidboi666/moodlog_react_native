import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/constants'
import { AuthService } from '@/services/auth.service'
import { MoodService } from '@/services/mood.service'
import { Mood, MoodLimits, MoodStoreState } from '@/types'

export const useMood = create<MoodStoreState>()(
  persist(
    (set, get) => ({
      moods: {},
      moodCount: 0,
      moodLimit: MoodLimits.FREE,
      isLoading: false,
      error: null,

      updateUserTier: async () => {
        try {
          set({ isLoading: true })
          const isPremium = await AuthService.checkPremiumStatus()
          set({
            moodLimit: isPremium ? MoodLimits.PREMIUM : MoodLimits.FREE,
          })
        } catch (err) {
          console.error('Failed to check user tier :', err)
        }
      },

      addMyMood: (newMood: Mood) => {
        try {
          set({ isLoading: true, error: null })
          const { moods, moodCount } = get()
          const newMoods = MoodService.addMood(moods, newMood)
          set({ moods: newMoods, moodCount: moodCount + 1 })
        } catch (err) {
          console.error('Failed to add mood :', err)
          if (err instanceof Error) {
            set({ error: err })
          } else {
            set({ error: new Error('An unknown error occurred') })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      getRemainingMoodCount: () => {
        return MoodService.getRemainingMoodCount(get().moods, get().moodLimit)
      },

      updateMood: (newMood: Mood) => {
        try {
          set({ isLoading: true, error: null })
          const { moods } = get()
          const newMoods = MoodService.updateMood(moods, newMood)
          set({ moods: newMoods })
        } catch (err) {
          console.error('Failed to add mood :', err)
          if (err instanceof Error) {
            set({ error: err })
          } else {
            set({ error: new Error('An unknown error occurred') })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      removeMyMood: (moodId: string) => {
        const { moods = {} } = get()

        if (!moods[moodId]) {
          return { error: 'my_mood_not_found' }
        }

        const newMyMoods = { ...moods }
        delete newMyMoods[moodId]

        set({ moods: newMyMoods })
        return { success: true }
      },
    }),
    {
      name: STORAGE_KEY.MOOD,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        moods: state.moods,
        moodCount: state.moodCount,
      }),
    },
  ),
)
