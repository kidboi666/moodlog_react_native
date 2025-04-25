import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/shared/constants'
import { MoodLimits, Moods } from '@/shared/types'

interface StoreState {
  moods: Moods
  moodLimit: number
  moodCount: number

  updateMoodLimit: (isPremium: boolean) => void
  addMood: (newMoods: Moods) => void
  removeMood: (newMoods: Moods) => void
  updateMood: (newMoods: Moods) => void
}

export const useMood = create<StoreState>()(
  persist(
    (set, get) => ({
      moods: {},
      moodCount: 0,
      moodLimit: MoodLimits.FREE,

      updateMoodLimit: isPremium =>
        set({ moodLimit: isPremium ? MoodLimits.PREMIUM : MoodLimits.FREE }),
      addMood: moods => set({ moods, moodCount: get().moodCount + 1 }),
      removeMood: moods => set({ moods, moodCount: get().moodCount - 1 }),
      updateMood: moods => set({ moods }),
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
