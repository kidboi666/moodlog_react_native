import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { memo, useEffect, useRef } from 'react'

import { useBottomSheet } from '@/store'
import { type BottomSheetProps, BottomSheetType } from '@/types'
import { DeleteJournalModal, LogoutModal, SignInModal } from './contents'

const SheetContentComponents = {
  [BottomSheetType.DELETE_JOURNAL]: (
    props: BottomSheetProps[BottomSheetType.DELETE_JOURNAL],
  ) => <DeleteJournalModal {...props} />,
  [BottomSheetType.SIGN_IN]: (
    props: BottomSheetProps[BottomSheetType.SIGN_IN],
  ) => <SignInModal {...props} />,
  [BottomSheetType.LOGOUT]: (
    props: BottomSheetProps[BottomSheetType.LOGOUT],
  ) => <LogoutModal {...props} />,
}

export const BottomSheet = memo(() => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null)
  const {
    isOpen,
    type,
    snapPoints,
    props,
    hideBottomSheet,
    enablePanDownToClose,
  } = useBottomSheet()

  const renderContent = () => {
    if (!type) return null

    const ContentComponent = SheetContentComponents[type]
    if (!ContentComponent) return null

    return <ContentComponent {...props} />
  }

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand()
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isOpen])

  return (
    <GorhomBottomSheet
      ref={bottomSheetRef}
      onChange={hideBottomSheet}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={enablePanDownToClose}
      backdropComponent={BottomSheetBackdrop}
    >
      <BottomSheetView>{renderContent()}</BottomSheetView>
    </GorhomBottomSheet>
  )
})
