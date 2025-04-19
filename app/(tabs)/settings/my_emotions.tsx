import { Trash } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import * as Crypto from 'expo-crypto'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import {
  Button,
  Input,
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui'

import { useApp } from '@/store'
import { MyMood, SubscriptionTier } from '@/types'

import { ColorPicker } from '@/components/features/settings/ColorPicker'
import { SettingHeader } from '@/components/features/settings/SettingHeader'
import { BaseText } from '@/components/shared/BaseText'
import { H2, H3 } from '@/components/shared/Heading'
import { PremiumFeature } from '@/components/shared/PremiumFeature'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'

export default function Screen() {
  const { t } = useTranslation()
  const [newMoodName, setNewMoodName] = useState('')
  const [selectedColor, setSelectedColor] = useState('#FF5733')
  const toast = useToastController()

  const settings = useApp(state => state.settings)
  const addMyMood = useApp(state => state.addMyMood)
  const removeMyMood = useApp(state => state.removeMyMood)
  const { myMoods = {}, subscriptionTier } = settings

  const handleAddMood = useCallback(() => {
    if (!newMoodName.trim()) {
      toast.show('알림', {
        message: '감정 이름을 입력해주세요.',
      })
      return
    }

    const newMood: MyMood = {
      id: Crypto.randomUUID(),
      name: newMoodName.trim(),
      color: selectedColor,
      createdAt: new Date().toISOString(),
    }

    const result = addMyMood(newMood)

    if (result.error === 'free_user_custom_mood_limit') {
      toast.show('알림', {
        message: '무료 회원은 최대 4개의 감정만 생성할 수 있습니다.',
      })
      return
    }

    if (result.success) {
      setNewMoodName('')
      toast.show('알림', {
        message: '새로운 감정이 추가되었습니다.',
      })
    }
  }, [newMoodName, selectedColor, addMyMood, toast])

  const handleRemoveMood = useCallback(
    (moodId: string) => {
      removeMyMood(moodId)
      toast.show('알림', {
        message: '감정이 삭제되었습니다.',
      })
    },
    [removeMyMood, toast],
  )

  const canAddMoreMoods =
    subscriptionTier === SubscriptionTier.PREMIUM ||
    Object.keys(myMoods).length < 4

  return (
    <ViewContainer Header={<SettingHeader />}>
      <ScrollView>
        <YStack gap={16} p={16}>
          <H2>{t('settings.customEmotions.title')}</H2>
          <BaseText>{t('settings.customEmotions.description')}</BaseText>

          <Separator />

          <YStack gap={16}>
            <H3>{t('settings.customEmotions.create')}</H3>
            <XStack gap={8} items='center'>
              <Input
                flex={1}
                value={newMoodName}
                onChangeText={setNewMoodName}
                placeholder={t('settings.customEmotions.namePlaceholder')}
              />
              <ColorPicker
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
              />
              <Button
                theme='active'
                disabled={!canAddMoreMoods || !newMoodName.trim()}
                onPress={handleAddMood}
              >
                {t('common.add')}
              </Button>
            </XStack>

            {!canAddMoreMoods && subscriptionTier === SubscriptionTier.FREE && (
              <View>
                <BaseText style={styles.limitText}>
                  {t('settings.customEmotions.limitReached')}
                </BaseText>
                <PremiumFeature>
                  <BaseText>
                    {t('settings.customEmotions.upgradeToPremium')}
                  </BaseText>
                </PremiumFeature>
              </View>
            )}
          </YStack>

          <Separator />

          <YStack space={8}>
            <H3>{t('settings.customEmotions.list')}</H3>
            {Object.values(myMoods).length === 0 ? (
              <BaseText>{t('settings.customEmotions.empty')}</BaseText>
            ) : (
              <YStack>
                {Object.values(myMoods).map(mood => (
                  <View key={mood.id} style={styles.moodItem}>
                    <View
                      style={[
                        styles.colorIndicator,
                        { backgroundColor: mood.color },
                      ]}
                    />
                    <BaseText style={styles.moodName}>{mood.name}</BaseText>
                    <Button
                      icon={<Trash size={16} />}
                      circular
                      onPress={() => handleRemoveMood(mood.id)}
                      theme='red'
                    />
                  </View>
                ))}
              </YStack>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  moodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  moodName: {
    flex: 1,
    marginLeft: 12,
  },
  limitText: {
    color: '#E53E3E',
    marginBottom: 4,
  },
})
