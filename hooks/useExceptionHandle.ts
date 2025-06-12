import { useCallback } from 'react'
import Toast from 'react-native-toast-message'

export function useExceptionHandle() {
  const handleError = useCallback((title: string, error?: Error) => {
    Toast.show({ text1: title, text2: error?.message, type: 'error' })
    console.error(error)
  }, [])

  const handleSuccess = useCallback(
    (title: string, callback?: () => void, message?: string) => {
      Toast.show({ text1: title, text2: message, type: 'success' })
      callback?.()
    },
    [],
  )

  return {
    onError: handleError,
    onSuccess: handleSuccess,
  }
}
