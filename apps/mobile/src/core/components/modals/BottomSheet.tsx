import { Sheet } from '@tamagui/sheet'
import { memo } from 'react'

import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal'
import { LogoutModal } from '@/core/components/modals/contents/LogoutModal'
import { SelectMoodModal } from '@/core/components/modals/contents/SelectMoodModal'
import { SignInModal } from '@/core/components/modals/contents/SignInModal'
import { SignUpModal } from '@/core/components/modals/contents/SignUpModal'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import {
  type BottomSheetProps,
  BottomSheetType,
} from '@/types/bottom-sheet.types'

const SheetContentComponents = {
  [BottomSheetType.DELETE_JOURNAL]: (
    props: BottomSheetProps[BottomSheetType.DELETE_JOURNAL],
  ) => <DeleteJournalModal {...props} />,
  [BottomSheetType.SELECT_MOOD]: (
    props: BottomSheetProps[BottomSheetType.SELECT_MOOD],
  ) => <SelectMoodModal {...props} />,
  [BottomSheetType.SIGN_UP]: (
    props: BottomSheetProps[BottomSheetType.SIGN_UP],
  ) => <SignUpModal {...props} />,
  [BottomSheetType.SIGN_IN]: (
    props: BottomSheetProps[BottomSheetType.SIGN_IN],
  ) => <SignInModal {...props} />,
  [BottomSheetType.LOGOUT]: (
    props: BottomSheetProps[BottomSheetType.LOGOUT],
  ) => <LogoutModal {...props} />,
}

export const BottomSheet = memo(() => {
  const { isOpen, type, snapPoint, props, hideBottomSheet } = useBottomSheet()

  const renderContent = () => {
    if (!type) return <></>

    const ContentComponent = SheetContentComponents[type]
    if (!ContentComponent) return <></>

    return <ContentComponent {...props} />
  }

  return (
    <Sheet
      forceRemoveScrollEnabled={isOpen}
      modal
      open={isOpen}
      disableDrag
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
