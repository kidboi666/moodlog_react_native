import { queryOptions, useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'

import { queryKeys } from '@/constants'
import { useExceptionHandle } from '@/hooks'
import {
  getProfile,
  signInAnonymously,
  signInGoogle,
  updateUserInfo,
} from '@/services'
import { useAuth } from '@/store'
import { UpdateUserInfoParams, UserInfo } from '@/types'

export const UserQueries = {
  getUserInfo: (userId: string) => {
    return queryOptions<UserInfo>({
      queryKey: queryKeys.get.userInfo(userId),
      queryFn: () => getProfile(userId),
      enabled: !!userId,
    })
  },
}

export function useSignInGoogle() {
  const router = useRouter()
  const { onError, onSuccess } = useExceptionHandle()
  const setSession = useAuth(state => state.setSession)
  return useMutation({
    mutationFn: () => signInGoogle(),
    onSuccess: data =>
      onSuccess('로그인에 성공했습니다.', () => {
        setSession(data.session)
        router.replace('/(tabs)/home')
      }),
    onError: error => onError('로그인에 실패했습니다.', error),
  })
}

export function useSignInAnonymously() {
  const router = useRouter()
  const { onError, onSuccess } = useExceptionHandle()
  const setSession = useAuth(state => state.setSession)
  return useMutation({
    mutationFn: (nickname: string) => signInAnonymously(nickname),
    onSuccess: data =>
      onSuccess('로그인에 성공했습니다.', () => {
        setSession(data.session)
        router.replace('/(tabs)/home')
      }),
    onError: error => onError('로그인에 실패했습니다.', error),
  })
}

export function useUpdateUserInfo(showToast = true) {
  const { onError, onSuccess } = useExceptionHandle()
  return useMutation({
    mutationFn: (args: UpdateUserInfoParams) => updateUserInfo(args),
    onSuccess: () => {
      if (!showToast) return
      Toast.show({ type: 'success', text1: '유저 정보가 수정되었습니다.' })
    },
    onError: error => onError('유저 정보 수정에 실패했습니다', error),
  })
}
