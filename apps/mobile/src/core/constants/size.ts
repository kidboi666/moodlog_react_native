import { Platform } from 'react-native'

/**
 * Space
 */
export const CONTAINER_HORIZONTAL_PADDING = 18

export const CONTAINER_VERTICAL_PADDING = 18

export const CONTAINER_MARGIN_TOP = 28

export const CONTAINER_PADDING_BOTTOM = 180

export const CALENDAR_SCROLL_SIZE = 44

/**
 * Height
 */
export const HOME_HEADER_LINE_HEIGHT = 48

export const RECORD_UNIT_LINE_HEIGHT = 26

export const RECORD_CARD_HEIGHT = 180

export const RECORD_CARD_EXPANDED_HEIGHT = 450

export const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 60 : 80

export const KEYBOARD_VERTICAL_OFFSET = Platform.OS === 'ios' ? 120 : 0

/**
 * SnapPoints
 */
export const DELETE_JOURNAL_SNAP_POINTS = Platform.OS === 'ios' ? [40] : [30]

export const SELECT_MOOD_SNAP_POINTS = Platform.OS === 'ios' ? [80] : [80]

export const JOURNAL_WRITE_SNAP_POINTS = Platform.OS === 'ios' ? [80] : [60]

export const LOGOUT_SNAP_POINTS = Platform.OS === 'ios' ? [40] : [30]

export const AUTH_SNAP_POINTS = [90]
