/**
 * 객체의 밸류들을 배열로 반환
 */
export const castArray = <T>(value: Record<string, T>): T[] => {
  return Object.values(value)
}

/**
 * 객체의 키를 배열로 반환
 */
export const extractKeys = (obj: Record<string, any>): string[] => {
  return Object.keys(obj)
}

/**
 * 배열 또는 단일 값을 받아 항상 단일 값으로 반환
 */
export const toSingle = <T>(value: T | T[]): T => {
  return Array.isArray(value) ? value[0] : value
}

/**
 * 문자열 앞의 0을 제거하고 숫자로 변환
 */
export const removeLeadingZero = (str: string) => {
  if (str.charAt(0) === '0' && str.length > 1) {
    return Number(str.substring(1))
  }

  return Number(str)
}

export const hexToRgba = (hex: string, alpha: number) => {
  const hexValue = hex.startsWith('#') ? hex.slice(1) : hex

  const r = Number.parseInt(hexValue.substring(0, 2), 16)
  const g = Number.parseInt(hexValue.substring(2, 4), 16)
  const b = Number.parseInt(hexValue.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * animateOnly 에 필요한 배열을 애니메이션 객체에서 추출
 */
export const extractKeysFromAnimationObj = (
  animationObj: Record<string, any>,
) => {
  const resultKeys = [...Object.keys(animationObj)]
  const transformShorthands = ['x', 'y', 'scale']

  const bgIndex = resultKeys.indexOf('bg')
  if (bgIndex !== -1) {
    resultKeys[bgIndex] = 'backgroundColor'
  }

  let hasTransform = resultKeys.includes('transform')

  for (const shorthand of transformShorthands) {
    const index = resultKeys.indexOf(shorthand)
    if (index !== -1) {
      resultKeys.splice(index, 1)

      if (!hasTransform) {
        resultKeys.push('transform')
        hasTransform = true
      }
    }
  }

  return resultKeys
}

/**
 * 카멜 케이스 문자열을 상수 케이스로 변환
 * @param str
 */
export const camelToConstantCase = (str: string): string => {
  const withUnderscores = str.replace(/([A-Z])/g, '_$1')

  const upperCase = withUnderscores.toUpperCase()

  return upperCase.startsWith('_') ? upperCase.substring(1) : upperCase
}

/**
 * 간단한 이메일 검증
 */
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const delay = (fn: any, ms = 300) => {
  return Promise.resolve(setTimeout(fn, ms))
}
