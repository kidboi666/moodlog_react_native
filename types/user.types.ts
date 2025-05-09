import { Maybe } from './util.types'

export type UserInfo = {
  id: string
  userName: string
  email: string
  provider: Maybe<string>
  age: Maybe<number>
  avatarUrl: Maybe<string>
}

export type NewUserInfo = Partial<
  Pick<UserInfo, 'email' | 'age' | 'avatarUrl' | 'userName'>
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
