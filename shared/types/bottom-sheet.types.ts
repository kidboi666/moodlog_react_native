export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  LOGOUT = 'LOGOUT',
  DELETE_MOOD = 'DELETE_MOOD',
}

export type BottomSheetProps = {
  [BottomSheetType.DELETE_JOURNAL]: {
    journalId: string
    isLoading: boolean
    onDelete: (journalId: string) => void
    hideBottomSheet: () => void
  }
  [BottomSheetType.SIGN_UP]: {}
  [BottomSheetType.SIGN_IN]: {}
  [BottomSheetType.LOGOUT]: {
    hideBottomSheet: () => void
  }
  [BottomSheetType.DELETE_MOOD]: {
    moodId: string
    onDelete: (moodId: string) => void
    isLoading: boolean
    hideBottomSheet: () => void
  }
}
