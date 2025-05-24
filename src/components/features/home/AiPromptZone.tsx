import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

import { Button, FormInput } from '@/components/shared'
import { getGemini } from '@/lib/gemini'

export function AiPromptZone() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const gemini = getGemini()

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const result = await gemini.getComfortPrompt(text)
      setAiResponse(result.text || '')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    gemini.initialize()
  }, [])

  return (
    <View style={styles.container}>
      <FormInput value={text} onChangeText={setText} />
      {isLoading && <ActivityIndicator />}
      {aiResponse && (
        <View>
          <Text>{aiResponse}</Text>
        </View>
      )}
      <Button>AI에게 보내기</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 28,
  },
})
