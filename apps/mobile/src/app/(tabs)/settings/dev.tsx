import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Button, H1, ScrollView } from 'tamagui'

import { SettingsContainer } from '@/core/components/features/settings/SettingsContainer'
import { useDev } from '@/core/hooks/useDev'
import { useAuthStore } from '@/core/services/auth.service'
import * as S from '@/styles/screens/settings/DevScreen.styled'

export default function DevScreen() {
  const { t } = useTranslation()
  const router = useRouter()
  const { resetStores } = useDev()
  const { fetchAllUsers } = useAuthStore()

  return (
    <ScrollView>
      <S.ViewContainer>
        <H1>{t('settings.dev.title')}</H1>
        <S.ItemContainer>
          <SettingsContainer title={t('settings.dev.store')}>
            <S.StyledYStack>
              <Button themeInverse onPress={resetStores}>
                {t('settings.dev.resetStore')}
              </Button>
            </S.StyledYStack>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.network')}>
            <S.StyledYStack>
              <Button themeInverse variant='outlined'>
                {t('settings.dev.apiCalls')}
              </Button>
              <Button themeInverse variant='outlined'>
                {t('settings.dev.serverStatus')}
              </Button>
            </S.StyledYStack>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.appStatus')}>
            <S.StyledYStack>
              <Button themeInverse variant='outlined'>
                {t('settings.dev.appVersion')}
              </Button>
              <Button themeInverse variant='outlined'>
                {t('settings.dev.logs')}
              </Button>
            </S.StyledYStack>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.memberInfo')}>
            <S.StyledYStack>
              <Button
                themeInverse
                variant='outlined'
                onPress={async () => {
                  try {
                    const users = await fetchAllUsers()
                    console.log('회원 정보:', users)
                  } catch (error) {
                    console.error('회원 정보를 불러오는 중 오류 발생:', error)
                  }
                }}
              >
                회원 정보 불러오기
              </Button>
            </S.StyledYStack>
          </SettingsContainer>
        </S.ItemContainer>
      </S.ViewContainer>
    </ScrollView>
  )
}
