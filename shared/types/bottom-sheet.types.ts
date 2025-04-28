export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  LOGOUT = 'LOGOUT',
  DELETE_MOOD = 'DELETE_MOOD',
  WRITE_JOURNAL = 'WRITE_JOURNAL',
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
    isLoading: boolean
    onDelete: (moodId: string) => void
    hideBottomSheet: () => void
  }
  [BottomSheetType.WRITE_JOURNAL]: {
    onSubmit: () => void
  }
}
