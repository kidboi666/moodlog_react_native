export function castArray<T>(value: Record<string, T>): T[] {
  return Object.values(value)
}

export function toSingle<T>(value: T | T[]): T {
  const isArray = Array.isArray(value)
  return isArray ? value[0] : value
}

/**
 * 문자열 앞의 0을 제거하고 숫자로 변환
 */
export function removeLeadingZero(str: string) {
  if (str.charAt(0) === '0' && str.length > 1) return Number(str.substring(1))
  return Number(str)
}

export function hexToRgba(hex: string, alpha: number) {
  const hexValue = hex.startsWith('#') ? hex.slice(1) : hex
  const r = Number.parseInt(hexValue.substring(0, 2), 16)
  const g = Number.parseInt(hexValue.substring(2, 4), 16)
  const b = Number.parseInt(hexValue.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
/**
 * 카멜 케이스 문자열을 상수 케이스로 변환
 */
export function camelToConstantCase(str: string) {
  const withUnderscores = str.replace(/([A-Z])/g, '_$1')
  const upperCase = withUnderscores.toUpperCase()
  return upperCase.startsWith('_') ? upperCase.substring(1) : upperCase
}
/**
 * 간단한 이메일 검증
 */
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function delay(ms: number, fn?: any) {
  return Promise.resolve(setTimeout(fn, ms))
}

export function isEmptyObj(obj: Record<string, any>) {
  // biome-ignore lint/style/useConst: <explanation>
  for (let key in obj) {
    // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}
