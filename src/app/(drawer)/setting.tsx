import { Container } from '@/components/containers/Container';
import {
  ScrollView,
  Select,
  Separator,
  Switch,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { Check, ChevronDown, Globe, Moon } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@/store/hooks/useAppTheme';
import { useApp } from '@/store/hooks/useApp';

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: '한국어', value: 'ko' },
  { label: '日本語', value: 'ja' },
];

export default function SettingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { currentTheme, toggleTheme } = useAppTheme();
  const { language, onChangeLanguage } = useApp();

  const SettingItem = ({ icon, label, children }) => (
    <XStack items="center" justify="space-between" py="$4" px="$4">
      <XStack gap="$3" items="center">
        {icon}
        <Text fontSize="$5">{label}</Text>
      </XStack>
      {children}
    </XStack>
  );

  return (
    <Container>
      <ScrollView flex={1} bg="$background">
        <YStack py="$4" gap="$2">
          {/* Theme Setting */}
          <SettingItem
            icon={<Moon size="$1" color="$color" />}
            label={t('setting.theme.title')}
          >
            <Switch
              id="darkmode"
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
              value={language}
              onValueChange={onChangeLanguage}
              items={LANGUAGES}
              defaultValue="en"
              disablePreventBodyScroll
            >
              <Select.Trigger width={120} iconAfter={ChevronDown}>
                <Select.Value placeholder="select" />
              </Select.Trigger>

              <Select.Content zIndex={20000}>
                <Select.ScrollUpButton />
                <Select.Viewport minW={120}>
                  <Select.Group>
                    <Select.Label>Language</Select.Label>
                    {LANGUAGES.map((lang, i) => (
                      <Select.Item
                        key={lang.value}
                        index={i}
                        value={lang.value}
                      >
                        <Select.ItemText>{lang.label}</Select.ItemText>
                        <Select.ItemIndicator>
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
      </ScrollView>
    </Container>
  );
}
