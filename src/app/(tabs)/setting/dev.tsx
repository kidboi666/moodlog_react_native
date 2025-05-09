import {
  Activity,
  Database,
  RefreshCw,
  Server,
  Users,
} from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, ScrollView, YStack, styled } from 'tamagui'

import { SettingsContainer } from '@/components/features/setting'
import { H1 } from '@/components/shared'
import { ViewContainer } from '@/components/shared'
import { useDev } from '@/hooks/useDev'

export default function DevScreen() {
  const { t } = useTranslation()
  const { resetStores, resetDatabase } = useDev()

  return (
    <ScrollView>
      <Container>
        <H1>{t('settings.dev.title')}</H1>
        <ContentContainer>
          <SettingsContainer title={t('settings.dev.store')}>
            <SpacingBox>
              <Button onPress={resetStores} icon={<RefreshCw size='$1' />}>
                {t('settings.dev.resetStore')}
              </Button>
            </SpacingBox>
            <SpacingBox>
              <Button onPress={resetDatabase} icon={<Database size='$1' />}>
                {t('settings.dev.resetDatabase')}
              </Button>
            </SpacingBox>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.network')}>
            <SpacingBox>
              <Button icon={<Activity size='$1' />}>
                {t('settings.dev.apiCalls')}
              </Button>
              <Button icon={<Server size='$1' />}>
                {t('settings.dev.serverStatus')}
              </Button>
            </SpacingBox>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.appStatus')}>
            <SpacingBox>
              <Button icon={<Database size='$1' />}>
                {t('settings.dev.appVersion')}
              </Button>
              <Button icon={<Activity size='$1' />}>
                {t('settings.dev.logs')}
              </Button>
            </SpacingBox>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.memberInfo')}>
            <SpacingBox>
              <Button icon={<Users size='$1' />}>
                {t('settings.dev.loadMemberInfo')}
              </Button>
            </SpacingBox>
          </SettingsContainer>
        </ContentContainer>
      </Container>
    </ScrollView>
  )
}

const Container = styled(ViewContainer, {
  padded: true,
  gap: '$4',
})

const ContentContainer = styled(YStack, {
  gap: '$4',
})

const SpacingBox = styled(YStack, {
  gap: '$2',
})
