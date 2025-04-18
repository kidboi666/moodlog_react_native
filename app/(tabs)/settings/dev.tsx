import {
  Activity,
  Database,
  RefreshCw,
  Server,
  Users,
} from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, H1, ScrollView } from 'tamagui'

import { SettingsContainer } from '@/components/features/settings/SettingsContainer'
import { useDev } from '@/hooks/useDev'
import * as S from '@/styles/screens/settings/DevScreen.styled'

export default function DevScreen() {
  const { t } = useTranslation()
  const { resetStores } = useDev()

  return (
    <ScrollView>
      <S.ViewContainer>
        <H1>{t('settings.dev.title')}</H1>
        <S.ItemContainer>
          <SettingsContainer title={t('settings.dev.store')}>
            <S.StyledYStack>
              <Button onPress={resetStores} icon={<RefreshCw size='$1' />}>
                {t('settings.dev.resetStore')}
              </Button>
            </S.StyledYStack>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.network')}>
            <S.StyledYStack>
              <Button icon={<Activity size='$1' />}>
                {t('settings.dev.apiCalls')}
              </Button>
              <Button icon={<Server size='$1' />}>
                {t('settings.dev.serverStatus')}
              </Button>
            </S.StyledYStack>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.appStatus')}>
            <S.StyledYStack>
              <Button icon={<Database size='$1' />}>
                {t('settings.dev.appVersion')}
              </Button>
              <Button icon={<Activity size='$1' />}>
                {t('settings.dev.logs')}
              </Button>
            </S.StyledYStack>
          </SettingsContainer>

          <SettingsContainer title={t('settings.dev.memberInfo')}>
            <S.StyledYStack>
              <Button icon={<Users size='$1' />}>
                {t('settings.dev.loadMemberInfo')}
              </Button>
            </S.StyledYStack>
          </SettingsContainer>
        </S.ItemContainer>
      </S.ViewContainer>
    </ScrollView>
  )
}
