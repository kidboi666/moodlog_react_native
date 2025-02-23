import { Container } from '@/components/containers/Container';
import {
  Label,
  Select,
  Separator,
  Switch,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { Check, ChevronDown, Globe, Moon } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@/store/hooks/useAppTheme';
import { useApp } from '@/store/hooks/useApp';
import { LANGUAGES } from '@/constants/language';

export default function SettingScreen() {
  const { t } = useTranslation();
  const { currentTheme, toggleTheme } = useAppTheme();
  const { language, onChangeLanguage } = useApp();

  const SettingItem = ({ icon, label, children }) => (
    <XStack justify="space-between" items="center" py="$4" px="$4">
      <Label htmlFor={label} flex={1}>
        <XStack gap="$3" items="center">
          {icon}
          <Text fontSize="$5">{label}</Text>
        </XStack>
      </Label>
      {children}
    </XStack>
  );

  return (
    <Container>
      <YStack py="$4" gap="$2">
        {/* Theme Setting */}
        <SettingItem
          icon={<Moon size="$1" color="$color" />}
          label={t('setting.theme.title')}
        >
          <Switch
            id={t('setting.theme.title')}
            checked={currentTheme === 'dark'}
            onCheckedChange={toggleTheme}
            bg={currentTheme === 'dark' ? '$green10' : '$gray7'}
            borderColor={currentTheme === 'dark' ? '$green10' : '$gray7'}
          >
            <Switch.Thumb
              animation="quick"
              bg={currentTheme === 'dark' ? '$gray4' : '$gray1'}
            />
          </Switch>
        </SettingItem>

        <Separator />

        {/* Language Setting */}
        <SettingItem
          icon={<Globe size="$1" color="$color" />}
          label={t('setting.language.title')}
        >
          <Select
            native
            id={t('setting.language.title')}
            value={language}
            onValueChange={onChangeLanguage}
            defaultValue="en"
            disablePreventBodyScroll
          >
            <Select.Trigger width="$13" iconAfter={ChevronDown}>
              <Select.Value placeholder="Select" />
            </Select.Trigger>

            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport
                animation="quick"
                animateOnly={['transform', 'opacity']}
                enterStyle={{ x: 0, y: -10 }}
                exitStyle={{ x: 0, y: 10 }}
              >
                <Select.Group>
                  <Select.Label>Language</Select.Label>
                  {LANGUAGES.map((lang, i) => (
                    <Select.Item index={i} key={lang.value} value={lang.value}>
                      <Select.ItemText>{lang.label}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size="$2" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </SettingItem>
      </YStack>
    </Container>
  );
}
