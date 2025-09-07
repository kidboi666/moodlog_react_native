import { GeminiService } from '@/src/services'

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || ''

let gemini: GeminiService | undefined = undefined

const getGemini = () => {
  if (!gemini) {
    gemini = new GeminiService(apiKey)
  }
  return gemini
}

export { gemini, getGemini }
