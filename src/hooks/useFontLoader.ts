import { fontsToLoad } from '@/src/configs'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

export const useFontLoader = () => {
  const [fontLoaded, fontError] = useFonts(fontsToLoad)

  // 폰트 로딩 상태 및 오류 로깅
  useEffect(() => {
    if (fontError) {
      console.error('폰트 로딩 오류:', fontError)
    }
    if (fontLoaded) {
      console.log('모든 폰트가 성공적으로 로드되었습니다.')
    }
  }, [fontLoaded, fontError])

  // Handle splash screen
  useEffect(() => {
    async function hideSplashScreen() {
      try {
        if (fontLoaded || fontError) {
          await SplashScreen.hideAsync()
        }
      } catch (err) {
        console.warn('Error hiding splash screen:', err)
      }
    }
    hideSplashScreen()
  }, [fontLoaded, fontError])

  return { fontLoaded, fontError }
}
