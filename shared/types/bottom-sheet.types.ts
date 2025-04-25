export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  LOGOUT = 'LOGOUT',
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
}
