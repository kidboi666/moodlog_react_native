import { View, styled } from 'tamagui';

import {
  CONTAINER_HORIZONTAL_PADDING,
  CONTAINER_PADDING_BOTTOM,
} from '@/core/constants/size';

export const ViewContainer = styled(View, {
  flex: 1,
  px: CONTAINER_HORIZONTAL_PADDING,

  variants: {
    padded: {
      true: {
        pb: CONTAINER_PADDING_BOTTOM,
      },
    },
    topEdge: {
      ':number': mt => {
        return { mt };
      },
    },
    bottomEdge: {
      ':number': mb => {
        return { mb };
      },
    },
  } as const,
});
