import { STORAGE_KEY } from '@/core/constants/storage'
import { StorageService } from '@/core/services/storage.service'
import type { ISODateString } from '@/types/date.types'
import type { NewUserInfo, UserInfo } from '@/types/user.types'

export class User extends StorageService {
  static async loadUser() {
    const userInfo = await User.load(STORAGE_KEY.USER_INFO)
    return userInfo ? userInfo : null
  }

  static async saveNewUser(newUser: UserInfo): Promise<UserInfo> {
    await User.save(STORAGE_KEY.USER_INFO, newUser)
    return newUser
  }

  static async saveUser(userInfo: UserInfo, updatedUserInfo: NewUserInfo) {
    const newUserInfo = {
      ...userInfo,
      ...updatedUserInfo,
    }
    await User.save(STORAGE_KEY.USER_INFO, newUserInfo)
    return newUserInfo
  }

  static async saveDaysSinceSignup(
    userInfo: UserInfo,
    firstLaunchDate: ISODateString,
  ): Promise<number> {
    const today = new Date()
    const signupDate = new Date(firstLaunchDate)
    const diffTime = today.getTime() - signupDate.getTime()
    const daysSinceSignup = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const newUserInfo = {
      ...userInfo,
      daysSinceSignup,
    }
    await User.save(STORAGE_KEY.USER_INFO, newUserInfo)
    return daysSinceSignup
  }
}
