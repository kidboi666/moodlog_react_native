import { ISOString } from './date.types'

export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
}

export type BottomSheetProps = {
  [BottomSheetType.DELETE_JOURNAL]: {
    journalId: number
    hideBottomSheet: () => void
    localDate: ISOString
  }
}
