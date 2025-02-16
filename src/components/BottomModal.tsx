import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, PropsWithChildren } from 'react';
import { useTheme } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';

export const BottomModal = forwardRef<BottomSheetModal, PropsWithChildren>(
  ({ children }, ref) => {
    const theme = useTheme();
    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose
        index={0}
        snapPoints={['50%']}
        backgroundStyle={{
          backgroundColor: theme.gray7.val,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.gray12.val,
        }}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView
          style={{
            paddingHorizontal: CONTAINER_SPACING,
            paddingBottom: CONTAINER_SPACING * 2,
          }}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
