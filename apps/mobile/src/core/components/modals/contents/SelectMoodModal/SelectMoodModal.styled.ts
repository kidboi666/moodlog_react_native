import { YStack, styled } from 'tamagui';

import { BottomSheetContainer as HOSBottomSheetContainer } from '@/core/components/modals/BottomSheetContainer';

export const BottomSheetContainer = styled(HOSBottomSheetContainer);

export const YStackContainer = styled(YStack, {
  flex: 1,
  gap: '$6',
});
