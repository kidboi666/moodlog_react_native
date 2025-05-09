import { Maybe } from '@/types'

export class CommonUtils {
  /**
   * 객체의 밸류들을 배열로 반환
   */
  static castArray = <T>(value: Record<string, T>): T[] => {
    return Object.values(value)
  }

  /**
   * 객체의 키를 배열로 반환
   */
  static extractKeys = (obj: Record<string, any>): string[] => {
    return Object.keys(obj)
  }

  /**
   * 배열 또는 단일 값을 받아 항상 단일 값으로 반환
   */
  static toSingle = <T>(value: T | T[]): Maybe<T> => {
    const isArray = Array.isArray(value)
    if (isArray && value.length === 0) return
    return isArray ? value[0] : value
  }

  /**
   * 문자열 앞의 0을 제거하고 숫자로 변환
   */
  static removeLeadingZero = (str: string) => {
    if (str.charAt(0) === '0' && str.length > 1) return Number(str.substring(1))
    return Number(str)
  }

  static hexToRgba = (hex: string, alpha: number) => {
    const hexValue = hex.startsWith('#') ? hex.slice(1) : hex
    const r = Number.parseInt(hexValue.substring(0, 2), 16)
    const g = Number.parseInt(hexValue.substring(2, 4), 16)
    const b = Number.parseInt(hexValue.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  /**
   * 카멜 케이스 문자열을 상수 케이스로 변환
   * @param str
   */
  static camelToConstantCase = (str: string): string => {
    const withUnderscores = str.replace(/([A-Z])/g, '_$1')
    const upperCase = withUnderscores.toUpperCase()
    return upperCase.startsWith('_') ? upperCase.substring(1) : upperCase
  }

  /**
   * 간단한 이메일 검증
   */

  static isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static delay = async (ms: number, fn?: any) => {
    return Promise.resolve(setTimeout(fn, ms))
  }

  static isEmptyObj = (obj: Record<string, any>) => {
    // biome-ignore lint/style/useConst: <explanation>
    for (let key in obj) {
      // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }
}
