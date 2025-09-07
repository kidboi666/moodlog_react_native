import { create } from 'zustand'

import type { BottomSheetProps, BottomSheetType, Maybe } from '@/src/types'

interface StoreState {
  isOpen: boolean
  type: Maybe<BottomSheetType>
  snapPoints: (number | string)[]
  props: any
  enablePanDownToClose: boolean
  enableDismissOnClose: boolean

  showBottomSheet: <T extends BottomSheetType>(
    type: T,
    snapPoints: (number | string)[],
    props?: BottomSheetProps[T],
    options?: {
      enablePanDownToClose?: boolean
      enableDismissOnClose?: boolean
    },
  ) => void
  hideBottomSheet: () => void
  updateSnapPoints: (snapPoints: (string | number)[]) => void
}

export const useBottomSheet = create<StoreState>(set => ({
  isOpen: false,
  type: null,
  snapPoints: ['50%'],
  props: {},
  enablePanDownToClose: true,
  enableDismissOnClose: true,

  showBottomSheet: <T extends BottomSheetType>(
    type: T,
    snapPoints: (number | string)[],
    props?: BottomSheetProps[T],
    options?: {
      enablePanDownToClose?: boolean
      enableDismissOnClose?: boolean
    },
  ) => {
    set({
      isOpen: true,
      type,
      snapPoints,
      props,
      enablePanDownToClose: options?.enablePanDownToClose ?? true,
      enableDismissOnClose: options?.enableDismissOnClose ?? true,
    })
  },
  hideBottomSheet: () => {
    set({
      isOpen: false,
      type: null,
      props: {},
    })
  },

  updateSnapPoints: (snapPoints: (string | number)[]) => {
    set({ snapPoints })
  },
}))
