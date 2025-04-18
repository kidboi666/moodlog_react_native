import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'

import { ERROR_KEY, STORAGE_KEY } from '@/constants'
import { api } from '@/lib/api'
import type { UserInfo } from '@/types'

export class AuthService {
  static async signin(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { access_token, user } = response

      if (!access_token || !user) {
        throw new Error(ERROR_KEY.AUTH_LOGIN_INVALID_DATA)
      }

      await AuthService.saveToken(access_token)

      return {
        token: access_token,
        user: {
          id: user.id,
          email: user.email,
          userName: user.userName || '',
        },
      }
    } catch (error) {
      console.error('로그인 오류:', error)
      throw error instanceof Error
        ? error
        : new Error(ERROR_KEY.AUTH_LOGIN_FAILED)
    }
  }

  static async signup(email: string, password: string, userName: string) {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        userName,
      })

      const { access_token, user } = response

      if (!access_token || !user) {
        throw new Error(ERROR_KEY.AUTH_SIGNUP_INVALID_DATA)
      }

      await AuthService.saveToken(access_token)

      return {
        token: access_token,
        user: {
          id: user.id,
          email: user.email,
          userName: user.userName || userName,
        },
      }
    } catch (error) {
      console.error('회원가입 오류:', error)
      throw error instanceof Error
        ? error
        : new Error(ERROR_KEY.AUTH_SIGNUP_FAILED)
    }
  }

  static async logout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY.TOKEN)
      return true
    } catch (error) {
      console.error('로그아웃 오류:', error)
      throw error
    }
  }

  static async registerUser(userName: string, currentUserInfo: UserInfo) {
    try {
      const newUserInfo = {
        ...currentUserInfo,
        userName,
        id: Crypto.randomUUID(),
      }

      return newUserInfo
    } catch (error) {
      console.error('사용자 등록 오류:', error)
      throw error instanceof Error
        ? error
        : new Error(ERROR_KEY.USER_REGISTRATION_FAILED)
    }
  }

  static async updateUserInfo(
    currentUserInfo: UserInfo,
    updatedUserInfo: Partial<UserInfo>,
  ) {
    try {
      return { ...currentUserInfo, ...updatedUserInfo }
    } catch (error) {
      console.error('사용자 정보 업데이트 오류:', error)
      throw error instanceof Error
        ? error
        : new Error(ERROR_KEY.USER_INFO_UPDATE_FAILED)
    }
  }

  static async saveToken(token: string) {
    await AsyncStorage.setItem(STORAGE_KEY.TOKEN, token)
  }
}
