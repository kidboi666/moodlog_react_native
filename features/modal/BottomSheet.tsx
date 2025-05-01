import { Sheet } from '@tamagui/sheet'
import { memo } from 'react'

import { type BottomSheetProps, BottomSheetType } from '@/shared/types'
import { useBottomSheet } from 'shared/store'

import {
  DeleteJournalModal,
  DeleteMoodModal,
  LogoutModal,
  SignInModal,
  SignUpModal,
} from './contents'

const SheetContentComponents = {
  [BottomSheetType.DELETE_JOURNAL]: (
    props: BottomSheetProps[BottomSheetType.DELETE_JOURNAL],
  ) => <DeleteJournalModal {...props} />,
  [BottomSheetType.SIGN_UP]: (
    props: BottomSheetProps[BottomSheetType.SIGN_UP],
  ) => <SignUpModal {...props} />,
  [BottomSheetType.SIGN_IN]: (
    props: BottomSheetProps[BottomSheetType.SIGN_IN],
  ) => <SignInModal {...props} />,
  [BottomSheetType.LOGOUT]: (
    props: BottomSheetProps[BottomSheetType.LOGOUT],
  ) => <LogoutModal {...props} />,
  [BottomSheetType.DELETE_MOOD]: (
    props: BottomSheetProps[BottomSheetType.DELETE_MOOD],
  ) => <DeleteMoodModal {...props} />,
}

export const BottomSheet = memo(() => {
  const { isOpen, type, snapPoint, props, hideBottomSheet } = useBottomSheet()

  const renderContent = () => {
    if (!type) return null

    const ContentComponent = SheetContentComponents[type]
    if (!ContentComponent) return null

    return <ContentComponent {...props} />
  }

  return (
    <Sheet
      forceRemoveScrollEnabled={isOpen}
      modal
      open={isOpen}
      onOpenChange={hideBottomSheet}
      snapPoints={snapPoint}
      dismissOnSnapToBottom
      zIndex={100_000}
    >
      <Sheet.Overlay
        animation='quick'
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle scale={0.5} />
      <Sheet.Frame>{renderContent()}</Sheet.Frame>
    </Sheet>
  )
})
