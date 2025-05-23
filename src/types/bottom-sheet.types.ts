import { ISOString } from './date.types'

export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
  SIGN_IN = 'SIGN_IN',
  LOGOUT = 'LOGOUT',
}

export type BottomSheetProps = {
  [BottomSheetType.DELETE_JOURNAL]: {
    journalId: number
    hideBottomSheet: () => void
    localDate: ISOString
  }
  [BottomSheetType.SIGN_IN]: {}
  [BottomSheetType.LOGOUT]: {
    hideBottomSheet: () => void
  }
}
