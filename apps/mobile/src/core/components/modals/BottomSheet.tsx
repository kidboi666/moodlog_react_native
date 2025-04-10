import { memo } from 'react';

import { Sheet } from '@tamagui/sheet';

import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal';
import { JournalWriteModal } from '@/core/components/modals/contents/JournalWriteModal';
import { SelectMoodModal } from '@/core/components/modals/contents/SelectMoodModal';
import { SignInModal } from '@/core/components/modals/contents/SignInModal';
import { SignUpModal } from '@/core/components/modals/contents/SignUpModal';
import { useBottomSheet } from '@/core/store/bottom-sheet.store';

import { BottomSheetProps, BottomSheetType } from '@/types/bottom-sheet.types';

const SheetContentComponents = {
  [BottomSheetType.DELETE_JOURNAL]: (
    props: BottomSheetProps[BottomSheetType.DELETE_JOURNAL],
  ) => <DeleteJournalModal {...props} />,
  [BottomSheetType.SELECT_MOOD]: (
    props: BottomSheetProps[BottomSheetType.SELECT_MOOD],
  ) => <SelectMoodModal {...props} />,
  [BottomSheetType.JOURNAL_WRITE]: (
    props: BottomSheetProps[BottomSheetType.JOURNAL_WRITE],
  ) => <JournalWriteModal {...props} />,
  [BottomSheetType.SIGN_UP]: (
    props: BottomSheetProps[BottomSheetType.SIGN_UP],
  ) => <SignUpModal {...props} />,
  [BottomSheetType.SIGN_IN]: (
    props: BottomSheetProps[BottomSheetType.SIGN_IN],
  ) => <SignInModal {...props} />,
};

export const BottomSheet = memo(() => {
  const { isOpen, type, snapPoint, props, hideBottomSheet } = useBottomSheet();

  const renderContent = () => {
    if (!type) return null;

    const ContentComponent = SheetContentComponents[type];
    if (!ContentComponent) return null;

    return <ContentComponent {...props} />;
  };

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
        animation="quick"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle scale={0.5} />
      <Sheet.Frame>{renderContent()}</Sheet.Frame>
    </Sheet>
  );
});
