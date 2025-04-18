import type { Nullable } from './util.types'

export enum BottomSheetType {
  DELETE_JOURNAL = 'DELETE_JOURNAL',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  LOGOUT = 'LOGOUT',
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
  [BottomSheetType.SIGN_UP]: {}
  [BottomSheetType.SIGN_IN]: {}
  [BottomSheetType.LOGOUT]: {
    hideBottomSheet: () => void
  }
}
