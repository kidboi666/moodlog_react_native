import { useApp } from '@/src/data/store'
import { useCallback, useMemo, useState } from 'react'

export function useValidationNickname() {
  const { setUserName, userName } = useApp()
  const [error, setError] = useState<Error | null>(null)
  const isDisabled = useMemo(
    () => !userName || userName.length <= 2 || userName.length > 10,
    [userName],
  )

  const handleDraftUserNameChange = useCallback(
    (text: string) => {
      setUserName(text)
      if (error) {
        setError(null)
      }
    },
    [error],
  )

  const handleBlurInput = useCallback(() => {
    if (isDisabled) {
      setError(new Error('닉네임 글자수는 2~10자 입니다.'))
    }
  }, [isDisabled])

  return {
    error,
    isDisabled,
    handleDraftUserNameChange,
    handleBlurInput,
    userName,
  }
}
