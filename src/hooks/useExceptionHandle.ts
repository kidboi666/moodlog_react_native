import { AuthError } from '@supabase/supabase-js'
import { useToastController } from '@tamagui/toast'
import { useCallback } from 'react'

export function useExceptionHandle() {
  const toast = useToastController()

  const handleError = useCallback(
    (title: string, error?: Error | AuthError) => {
      toast.show(title, { message: error?.message, preset: 'error' })
      console.error(error)
    },
    [toast],
  )

  const handleSuccess = useCallback(
    (title: string, message?: string, callback?: () => void) => {
      toast.show(title, { message, preset: 'success' })
      callback?.()
    },
    [toast],
  )

  return {
    onError: handleError,
    onSuccess: handleSuccess,
  }
}
