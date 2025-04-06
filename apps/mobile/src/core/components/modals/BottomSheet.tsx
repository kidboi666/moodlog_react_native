import { DeleteJournalModal } from '@/core/components/modals/contents/DeleteJournalModal/DeleteJournalModal';
import { JournalWriteModal } from '@/core/components/modals/contents/JournalWriteModal/JournalWriteModal';
import { SelectMoodModal } from '@/core/components/modals/contents/SelectMoodModal/SelectMoodModal';
import { useBottomSheet } from '@/core/store/contexts/bottom-sheet.context';
import {
  BottomSheetProps,
  BottomSheetType,
} from '@/core/store/types/bottom-sheet.types';
import { Sheet } from '@tamagui/sheet';
import { memo } from 'react';

const SheetContentComponents = {
  [BottomSheetType.DELETE_JOURNAL]: memo(
    (props: BottomSheetProps[BottomSheetType.DELETE_JOURNAL]) => (
      <DeleteJournalModal {...props} />
    ),
  ),
  [BottomSheetType.SELECT_MOOD]: memo(
    (props: BottomSheetProps[BottomSheetType.SELECT_MOOD]) => (
      <SelectMoodModal {...props} />
    ),
  ),
  [BottomSheetType.JOURNAL_WRITE]: memo(
    (props: BottomSheetProps[BottomSheetType.JOURNAL_WRITE]) => (
      <JournalWriteModal {...props} />
    ),
  ),
};

export const BottomSheet = memo(() => {
  const { state, hideBottomSheet } = useBottomSheet();
  const { isOpen, type, snapPoint, props } = state;

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
      disableDrag
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
