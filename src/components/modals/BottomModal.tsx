import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, PropsWithChildren } from 'react';
import { useTheme } from 'tamagui';
import { CONTAINER_SPACING } from '@/constants/size';
import { Keyboard } from 'react-native';

export const BottomModal = forwardRef<BottomSheetModal, PropsWithChildren>(
  ({ children }, ref) => {
    const theme = useTheme();
    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose
        index={0}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        onChange={() => Keyboard.dismiss()}
        snapPoints={['50%']}
        backgroundStyle={{
          backgroundColor: theme.background.val,
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
            paddingBottom: CONTAINER_SPACING * 4,
          }}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
