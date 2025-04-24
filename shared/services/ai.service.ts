import { GoogleGenAI } from '@google/genai'

import {
  AI_DAILY_PROMPT,
  AI_SYSTEM_CONTEXT,
  generateComfortPrompt,
} from '@/shared/constants'

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

  public async getComfortPrompt(content: string) {
    const prompt = generateComfortPrompt(content)

    return await this.gemini.models.generateContent({
      model: this.model,
      contents: prompt,
    })
  }

  public async getDailyPrompt() {
    return await this.gemini.models.generateContent({
      model: this.model,
      contents: AI_DAILY_PROMPT,
    })
  }
}
