import { getGemini } from '@/lib/gemini'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

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
      <Form onSubmit={handleSubmit} gap='$4'>
        <Input value={text} onChangeText={setText} />
        {isLoading && <Spinner />}
        {aiResponse && (
          <View>
            <Paragraph>{aiResponse}</Paragraph>
          </View>
        )}
        <Form.Trigger asChild>
          <Button themeInverse>AI에게 보내기</Button>
        </Form.Trigger>
      </Form>
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
