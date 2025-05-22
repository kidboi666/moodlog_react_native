import { Platform } from 'react-native'

export const Layout = {
  SPACE: {
    CONTAINER_HORIZONTAL_PADDING: 12,
    CONTAINER_VERTICAL_PADDING: 12,
    CONTAINER_MARGIN_TOP: 28,
    CONTAINER_PADDING_TOP: 80,
    CONTAINER_PADDING_BOTTOM: 180,
    HEADER_VERTICAL_PADDING: 12,
    CALENDAR_SCROLL_SIZE: 44,
  },
  HEIGHT: {
    RECORD_UNIT_LINE_HEIGHT: 26,
    RECORD_CARD_HEIGHT: 180,
    RECORD_CARD_EXPANDED_HEIGHT: 450,
    TAB_BAR_HEIGHT: Platform.OS === 'ios' ? 60 : 80,
    KEYBOARD_VERTICAL_OFFSET: Platform.OS === 'ios' ? 140 : 0,
    WRITE_PROGRESS_BAR_HEIGHT: 120,
  },
  SNAP_POINTS: {
    DELETE: Platform.OS === 'ios' ? [35] : [30],
    JOURNAL_WRITE: Platform.OS === 'ios' ? [80] : [60],
    LOGOUT: Platform.OS === 'ios' ? [40] : [30],
    AUTH: [70],
  },
}

export const FONT_SIZE = {
  $2: 11,
  $3: 13,
  $4: 14,
  $5: 16, // 기본값
  $6: 18,
  $7: 20,
  $8: 24,
  $9: 30,
  $10: 36,
} as const
