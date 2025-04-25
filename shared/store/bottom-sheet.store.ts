import { create } from 'zustand'

import type {
  BottomSheetProps,
  BottomSheetType,
  Nullable,
} from '@/shared/types'

interface StoreState {
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

export const useBottomSheet = create<StoreState>(set => ({
  isOpen: false,
  type: null,
  snapPoint: [0],
  props: {},

  showBottomSheet: <T extends BottomSheetType>(
    type: T,
    snapPoint: number[] | string[],
    props?: BottomSheetProps[T],
  ) => {
    set({
      isOpen: true,
      type,
      snapPoint,
      props,
    })
  },
  hideBottomSheet: () => {
    set({
      isOpen: false,
      type: null,
      props: {},
    })
  },
}))
