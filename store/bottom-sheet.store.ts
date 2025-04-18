import { create } from 'zustand'

import type {
  BottomSheetProps,
  BottomSheetStore,
  BottomSheetType,
} from '@/types'

export const useBottomSheet = create<BottomSheetStore>(set => ({
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
