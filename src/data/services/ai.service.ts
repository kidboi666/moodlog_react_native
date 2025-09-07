import { GoogleGenAI } from '@google/genai'

import {
  AI_DAILY_PROMPT,
  AI_SYSTEM_CONTEXT,
  generateComfortPrompt,
} from '@/src/shared/constants'
import { MoodName } from '@/src/shared/types'

export class GeminiService {
  private gemini: GoogleGenAI
  private model = 'gemini-2.0-flash'

  constructor(apiKey: string) {
    this.gemini = new GoogleGenAI({ apiKey })
  }

  public async initialize() {
    try {
      const response = await this.gemini.models.generateContent({
        model: this.model,
        contents: 'hello',
        config: {
          systemInstruction: AI_SYSTEM_CONTEXT,
        },
      })
      console.log(response)
    } catch (err) {
      console.error()
    }
  }

  public async getDailyPrompt() {
    return await this.gemini.models.generateContent({
      model: this.model,
      contents: AI_DAILY_PROMPT,
    })
  }

  public async generateJournalResponse(content: string, moodName: MoodName) {
    return await this.gemini.models.generateContent({
      model: this.model,
      contents: generateComfortPrompt(content, moodName),
      config: {
        systemInstruction: AI_SYSTEM_CONTEXT,
      },
    })
  }
}
