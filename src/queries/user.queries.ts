import { useToastController } from '@tamagui/toast'
import { queryOptions, useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

import { queryKeys } from '@/constants'
import { useExceptionHandle } from '@/hooks'
import { getProfile, signInGoogle, updateUserInfo } from '@/services'
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
  const { onError } = useExceptionHandle()
  const setSession = useAuth(state => state.setSession)
  return useMutation({
    mutationFn: () => signInGoogle(),
    onSuccess: async data => {
      setSession(data.session)
      router.replace('/(tabs)')
    },
    onError: error => onError('로그인에 실패했습니다.', error),
  })
}

export function useUpdateUserInfo() {
  const toast = useToastController()
  const { onError } = useExceptionHandle()
  return useMutation({
    mutationFn: (args: UpdateUserInfoParams) => updateUserInfo(args),
    onSuccess: () => {
      toast.show('유저 정보가 수정되었습니다.')
    },
    onError: error => onError('유저 정보 수정에 실패했습니다', error),
  })
}
