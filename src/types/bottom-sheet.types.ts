import { ISOString } from './date.types'

export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  LOGOUT = 'LOGOUT',
  DELETE_MOOD = 'DELETE_MOOD',
}

export type BottomSheetProps = {
  [BottomSheetType.DELETE_JOURNAL]: {
    journalId: number
    hideBottomSheet: () => void
    localDate: ISOString
  }
  [BottomSheetType.SIGN_UP]: {}
  [BottomSheetType.SIGN_IN]: {}
  [BottomSheetType.LOGOUT]: {
    hideBottomSheet: () => void
  }
  [BottomSheetType.DELETE_MOOD]: {
    moodId: number
    onDelete: (moodId: string) => void
    isLoading: boolean
    hideBottomSheet: () => void
  }
}
