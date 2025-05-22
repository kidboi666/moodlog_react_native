import {
  Activity,
  Database,
  LogOut,
  Server,
  Users,
} from '@tamagui/lucide-icons'
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
            <Button onPress={signOut} icon={<LogOut size='$1' />}>
              로그아웃
            </Button>
          </View>
        </SettingsContainer>

        <SettingsContainer title={t('settings.dev.network')}>
          <View style={styles.column}>
            <Button icon={<Activity size='$1' />}>
              {t('settings.dev.apiCalls')}
            </Button>
            <Button icon={<Server size='$1' />}>
              {t('settings.dev.serverStatus')}
            </Button>
          </View>
        </SettingsContainer>

        <SettingsContainer title={t('settings.dev.appStatus')}>
          <View style={styles.column}>
            <Button icon={<Database size='$1' />}>
              {t('settings.dev.appVersion')}
            </Button>
            <Button icon={<Activity size='$1' />}>
              {t('settings.dev.logs')}
            </Button>
          </View>
        </SettingsContainer>

        <SettingsContainer title={t('settings.dev.memberInfo')}>
          <View style={styles.column}>
            <Button icon={<Users size='$1' />}>
              {t('settings.dev.loadMemberInfo')}
            </Button>
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
