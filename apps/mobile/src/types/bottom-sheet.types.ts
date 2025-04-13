import type { Draft } from '@/types/journal.types'
import type { Mood, MoodLevel, MoodType } from '@/types/mood.types'
import type { Nullable } from '@/types/util.types'

export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
  SELECT_MOOD = 'SELECT_MOOD',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
}

export interface BottomSheetStore {
  isOpen: boolean
  type: Nullable<BottomSheetType>
  snapPoint: number[] | string[]
  props: any

  showBottomSheet: <T extends BottomSheetType>(
    type: T,
    snapPoint: number[] | string[],
    props?: BottomSheetProps[T],
  ) => void
  hideBottomSheet: () => void
}

export type BottomSheetProps = {
  [BottomSheetType.DELETE_JOURNAL]: {
    journalId: string
    isLoading: boolean
    onDelete: (id: string) => Promise<void>
    onSuccess?: () => void
    hideBottomSheet: () => void
  }
  [BottomSheetType.SELECT_MOOD]: {
    hideBottomSheet: () => void
    onPress: () => void
  }
  [BottomSheetType.SIGN_UP]: {
    hideBottomSheet: () => void
    goLoginPage: () => void
  }
  [BottomSheetType.SIGN_IN]: {
    hideBottomSheet: () => void
  }
}
