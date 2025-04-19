import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import {
  Button,
  Card,
  RadioGroup,
  ScrollView,
  Select,
  Separator,
  Stack,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui'

import { useApp } from '@/store'
import { EmotionDisplayType, ISOMonthString } from '@/types'

import { SettingHeader } from '@/components/features/settings/SettingHeader'
import { BaseText } from '@/components/shared/BaseText'
import { H3 } from '@/components/shared/Heading'
import { RadioGroupItem } from '@/components/shared/RadioGroupItem'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import { getMonthKey } from '@/utils'

// 선택한 달의 이름을 번역하는 함수
const getMonthTranslation = (t: any, selectedMonth: string) => {
  const parts = selectedMonth.split('-')
  if (parts.length !== 2) return selectedMonth

  const year = parts[0]
  const month = parts[1]
  const monthKey = `month${month}`

  return `${year}년 ${t(`calendar.months.${monthKey}`)}`
}

export default function Screen() {
  const { t } = useTranslation()
  const emotionDisplayType = useApp(state => state.settings.emotionDisplayType)
  const emotionDisplaySettings = useApp(
    state => state.settings.emotionDisplaySettings || {},
  )
  const onSettingChange = useApp(state => state.onSettingChange)

  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    // 현재 월을 기본값으로 설정
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    return `${year}-${month}` as ISOMonthString
  })

  const [selectedType, setSelectedType] = useState<
    EmotionDisplayType | undefined
  >(() => emotionDisplaySettings[selectedMonth] || emotionDisplayType)

  // 월 목록 생성 (이번 달 포함 앞으로 12개월)
  const monthOptions = useMemo(() => {
    const options = []
    const now = new Date()

    for (let i = 0; i < 12; i++) {
      const year = now.getFullYear()
      const month = now.getMonth() + i + 1
      const adjustedYear = year + Math.floor((month - 1) / 12)
      const adjustedMonth = ((month - 1) % 12) + 1

      const isoMonth =
        `${adjustedYear}-${adjustedMonth.toString().padStart(2, '0')}` as ISOMonthString
      const monthKey = getMonthKey(isoMonth)

      options.push({
        name: `${adjustedYear}년 ${t(`calendar.months.${monthKey}`)}`,
        value: isoMonth,
      })
    }

    return options
  }, [t])

  const handleMonthChange = useCallback(
    (value: string) => {
      setSelectedMonth(value as ISOMonthString)
      // 선택한 월에 이미 설정된 감정 표현 방식이 있으면 그것을 선택
      setSelectedType(
        emotionDisplaySettings[value as ISOMonthString] || emotionDisplayType,
      )
    },
    [emotionDisplaySettings, emotionDisplayType],
  )

  const handleTypeChange = useCallback((value: string) => {
    setSelectedType(value as EmotionDisplayType)
  }, [])

  const handleSubmit = useCallback(() => {
    const newSettings = { ...emotionDisplaySettings }

    if (selectedType === emotionDisplayType) {
      // 기본 설정과 같으면 해당 월 설정을 제거
      delete newSettings[selectedMonth]
    } else {
      // 다르면 해당 월 설정을 저장
      newSettings[selectedMonth] = selectedType as EmotionDisplayType
    }

    onSettingChange('emotionDisplaySettings', newSettings)
  }, [
    emotionDisplaySettings,
    emotionDisplayType,
    onSettingChange,
    selectedMonth,
    selectedType,
  ])

  const handleResetAll = useCallback(() => {
    onSettingChange('emotionDisplaySettings', {})
  }, [onSettingChange])

  return (
    <ViewContainer Header={<SettingHeader />}>
      <ScrollView>
        <View style={styles.container}>
          <H3>{t('settings.emotionDisplay.title')}</H3>
          <BaseText>{t('settings.emotionDisplay.description')}</BaseText>

          <View>
            <RadioGroup
              value={emotionDisplayType}
              onValueChange={value =>
                onSettingChange(
                  'emotionDisplayType',
                  value as EmotionDisplayType,
                )
              }
            >
              <Card style={styles.optionCard}>
                <RadioGroupItem
                  value={EmotionDisplayType.FIVE_LEVELS_GOOD_BAD}
                  label={t('settings.emotionDisplay.fiveLevels')}
                />
                <BaseText style={styles.descriptionText}>
                  {t('settings.emotionDisplay.fiveLevelsDescription')}
                </BaseText>
              </Card>

              <Card style={styles.optionCard}>
                <RadioGroupItem
                  value={EmotionDisplayType.MY_EMOTIONS}
                  label={t('settings.emotionDisplay.customEmotions')}
                />
                <BaseText style={styles.descriptionText}>
                  {t('settings.emotionDisplay.customEmotionsDescription')}
                </BaseText>
              </Card>
            </RadioGroup>
          </View>

          <Separator />

          <H3>{t('settings.emotionDisplay.monthly')}</H3>
          <BaseText>
            {t('settings.emotionDisplay.currentMonth', {
              month: getMonthTranslation(t, selectedMonth),
            })}
          </BaseText>

          <View style={styles.selectContainer}>
            <Select value={selectedMonth} onValueChange={handleMonthChange}>
              <Select.Trigger>
                <Select.Value placeholder='Select Month' />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    {monthOptions.map(option => (
                      <Select.Item key={option.value} value={option.value}>
                        <Select.ItemText>{option.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </View>

          <View style={styles.radioGroupContainer}>
            <RadioGroup value={selectedType} onValueChange={handleTypeChange}>
              <Card style={styles.optionCard}>
                <RadioGroupItem
                  value={EmotionDisplayType.FIVE_LEVELS_GOOD_BAD}
                  label={t('settings.emotionDisplay.fiveLevels')}
                />
                <BaseText style={styles.descriptionText}>
                  {t('settings.emotionDisplay.fiveLevelsDescription')}
                </BaseText>
              </Card>

              <Card style={styles.optionCard}>
                <RadioGroupItem
                  value={EmotionDisplayType.MY_EMOTIONS}
                  label={t('settings.emotionDisplay.customEmotions')}
                />
                <BaseText style={styles.descriptionText}>
                  {t('settings.emotionDisplay.customEmotionsDescription')}
                </BaseText>
              </Card>
            </RadioGroup>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              theme='active'
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              {t('settings.emotionDisplay.submit')}
            </Button>
            <Button onPress={handleResetAll} style={styles.resetButton}>
              {t('settings.emotionDisplay.reset')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  optionCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  descriptionText: {
    marginTop: 8,
  },
  selectContainer: {
    marginVertical: 16,
  },
  radioGroupContainer: {
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  submitButton: {
    flex: 1,
    marginRight: 8,
  },
  resetButton: {
    width: 120,
  },
})
