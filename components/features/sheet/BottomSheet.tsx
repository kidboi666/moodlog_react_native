import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { memo, useCallback, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import { DeleteJournalSheet } from '@/components/features/sheet/contents'
import { useBottomSheet } from '@/store'
import { type BottomSheetProps, BottomSheetType } from '@/types'

const SheetContentComponents = {
  [BottomSheetType.DELETE_JOURNAL]: (
    props: BottomSheetProps[BottomSheetType.DELETE_JOURNAL],
  ) => <DeleteJournalSheet {...props} />,
}

export const BottomSheet = memo(() => {
  const { colors } = useTheme()
  const bottomSheetRef = useRef<GorhomBottomSheet>(null)
  const {
    isOpen,
    type,
    snapPoints,
    props,
    hideBottomSheet,
    enablePanDownToClose = true,
  } = useBottomSheet()

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={hideBottomSheet}
      />
    ),
    [hideBottomSheet],
  )

  // 인덱스 변경 핸들러
  const handleSheetChange = useCallback(
    (index: number) => {
      // -1은 완전히 닫힌 상태
      if (index === -1) {
        hideBottomSheet()
      }
    },
    [hideBottomSheet],
  )

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
      index={isOpen ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={enablePanDownToClose}
      enableDynamicSizing={false}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: colors.onBackground }}
      handleStyle={{ backgroundColor: colors.background }}
      backgroundStyle={{ backgroundColor: colors.background }}
      style={{ backgroundColor: colors.background }}
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
    >
      <BottomSheetView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {renderContent()}
      </BottomSheetView>
    </GorhomBottomSheet>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
