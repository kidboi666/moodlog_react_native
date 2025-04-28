import {
  Activity,
  Database,
  RefreshCw,
  Server,
  Users,
} from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, ScrollView, YStack } from 'tamagui'

import { SettingsContainer } from '@/features/setting/components'
import { H1 } from '@/shared/components'
import { ViewContainer } from '@/shared/components'
import { useDev } from '@/shared/hooks/useDev'

export default function DevScreen() {
  const { t } = useTranslation()
  const { resetStores } = useDev()

  return (
    <ScrollView>
      <ViewContainer padded gap='$4'>
        <H1>{t('settings.dev.title')}</H1>
        <YStack gap='$4'>
          <SettingsContainer title={t('settings.dev.store')}>
            <YStack gap='$2'>
              <Button onPress={resetStores} icon={<RefreshCw size='$1' />}>
                {t('settings.dev.resetStore')}
              </Button>
            </YStack>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.network')}>
            <YStack gap='$2'>
              <Button icon={<Activity size='$1' />}>
                {t('settings.dev.apiCalls')}
              </Button>
              <Button icon={<Server size='$1' />}>
                {t('settings.dev.serverStatus')}
              </Button>
            </YStack>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.appStatus')}>
            <YStack gap='$2'>
              <Button icon={<Database size='$1' />}>
                {t('settings.dev.appVersion')}
              </Button>
              <Button icon={<Activity size='$1' />}>
                {t('settings.dev.logs')}
              </Button>
            </YStack>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.memberInfo')}>
            <YStack gap='$2'>
              <Button icon={<Users size='$1' />}>
                {t('settings.dev.loadMemberInfo')}
              </Button>
            </YStack>
          </SettingsContainer>
        </YStack>
      </ViewContainer>
    </ScrollView>
  )
}
