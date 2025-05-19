import { Prettify } from '@/types/util.types'
import { Tables } from './supabase.types'

export type UserInfo = Tables<'profiles'>

export type NewUserInfo = Prettify<
  Pick<UserInfo, 'user_name' | 'age' | 'avatar_url' | 'email'>
>

export interface UserStore {
  userInfo: UserInfo
  draftUserName: string
  isLoading: boolean
  error: any | null

  registerUser: (userName: string) => Promise<void>
  onUserInfoChange: (updatedUserInfo: NewUserInfo) => Promise<void>
  onDraftUserNameChange: (userName: string) => void
}

export interface UpdateUserInfoParams {
  userId: string
  userName?: string
  age?: number
  avatarUrl?: string
}
