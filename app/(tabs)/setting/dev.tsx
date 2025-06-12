import { ScreenView } from '@/components/shared'
import { useDev } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { List } from 'react-native-paper'

export default function DevScreen() {
  const { t } = useTranslation()
  const { resetStores, resetDatabase } = useDev()

  return (
    <ScreenView withScroll padded>
      <View style={styles.contentBox}>
        <List.Section>
          <List.Subheader>{t('settings.dev.store')}</List.Subheader>
          <List.Item
            title={t('settings.dev.resetStore')}
            onPress={resetStores}
            left={() => <List.Icon icon='refresh' />}
          />
          <List.Item
            title={t('settings.dev.resetDatabase')}
            onPress={resetDatabase}
            left={() => <List.Icon icon='refresh' />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>{t('settings.dev.network')}</List.Subheader>
          <List.Item
            title={t('settings.dev.apiCalls')}
            onPress={() => null}
            left={() => <List.Icon icon='api' />}
          />
          <List.Item
            title={t('settings.dev.serverStatus')}
            onPress={() => null}
            left={() => <List.Icon icon='server-network' />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>{t('settings.dev.appStatus')}</List.Subheader>
          <List.Item
            onPress={() => null}
            title={t('settings.dev.appVersion')}
            left={() => <List.Icon icon='database' />}
          />
          <List.Item
            onPress={() => null}
            title={t('settings.dev.logs')}
            left={() => <List.Icon icon='server-network' />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>{t('settings.dev.memberInfo')}</List.Subheader>
          <List.Item
            onPress={() => null}
            title={t('settings.dev.loadMemberInfo')}
            left={() => <List.Icon icon='account' />}
          />
        </List.Section>
      </View>
    </ScreenView>
  )
}
const styles = StyleSheet.create({
  contentBox: {
    gap: 16,
  },
  column: {
    flexDirection: 'column',
    gap: 8,
  },
})
