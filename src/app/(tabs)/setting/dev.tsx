import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

import { SettingsContainer } from '@/components/features/setting'
import { H1, ScreenView } from '@/components/shared'
import { useDev } from '@/hooks'

export default function DevScreen() {
  const { t } = useTranslation()
  const { resetStores, resetDatabase, signOut } = useDev()

  return (
    <ScreenView withScroll padded style={styles.container}>
      <H1>{t('settings.dev.title')}</H1>
      <View style={styles.contentBox}>
        <SettingsContainer title={t('settings.dev.store')}>
          <View style={styles.column}>
            <Button onPress={resetStores} icon='refresh-cw' mode='contained'>
              {t('settings.dev.resetStore')}
            </Button>
          </View>
          <View style={styles.column}>
            <Button onPress={resetDatabase} icon='refresh-cw' mode='contained'>
              {t('settings.dev.resetDatabase')}
            </Button>
          </View>
          <View style={styles.column}>
            <Button onPress={signOut} icon='logout'>
              로그아웃
            </Button>
          </View>
        </SettingsContainer>

        <SettingsContainer title={t('settings.dev.network')}>
          <View style={styles.column}>
            <Button icon='api'>{t('settings.dev.apiCalls')}</Button>
            <Button icon='server-network'>
              {t('settings.dev.serverStatus')}
            </Button>
          </View>
        </SettingsContainer>

        <SettingsContainer title={t('settings.dev.appStatus')}>
          <View style={styles.column}>
            <Button icon='database'>{t('settings.dev.appVersion')}</Button>
            <Button icon='log'>{t('settings.dev.logs')}</Button>
          </View>
        </SettingsContainer>

        <SettingsContainer title={t('settings.dev.memberInfo')}>
          <View style={styles.column}>
            <Button icon='account'>{t('settings.dev.loadMemberInfo')}</Button>
          </View>
        </SettingsContainer>
      </View>
    </ScreenView>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  contentBox: {
    gap: 16,
  },
  column: {
    flexDirection: 'column',
    gap: 8,
  },
})
