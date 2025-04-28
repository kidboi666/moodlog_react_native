import { useCallback, useState } from 'react'

import { ImageService } from '@/shared/services'
import { Draft, MoodLevel } from '@/shared/types'

export const useDraftManage = (moodId: string, moodLevel: MoodLevel) => {
  return {
    onContentChange: handleContentChange,
    onImageUriChange: handleImageUriChange,
    onImageUriRemove: handleImageUriRemove,
    draft,
  }
}
