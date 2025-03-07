import { Button, H3, H5, YStack } from 'tamagui';
import { NotebookPen, Plus } from '@tamagui/lucide-icons';
import {
  ENTER_STYLE,
  ENTER_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/constants/styles';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { ISODateString } from '@/types/dtos/date';
import { CalendarUtils } from 'react-native-calendars';
import { useToastController } from '@tamagui/toast';

interface Props {
  date: ISODateString;
}

export const EmptyJournal = ({ date }: Props) => {
  const { t } = useTranslation();
  const toast = useToastController();
  const isToday = CalendarUtils.getCalendarDateString(new Date()) === date;

  return isToday ? (
    <YStack
      key={date}
      animation="quick"
      animateOnly={ENTER_STYLE_KEY}
      p="$6"
      px="$9"
      justify="center"
      items="center"
      bg="$gray4"
      rounded="$8"
      elevation="$4"
      gap="$3"
      enterStyle={ENTER_STYLE}
    >
      <H3 text="center" color="$gray11">
        {t('common.fallback.today')}
      </H3>
      <Button
        unstyled
        animation="quick"
        animateOnly={PRESS_STYLE_KEY}
        bg="$gray12"
        p="$4"
        rounded="$4"
        color="$gray1"
        icon={<Plus size="$1" />}
        onPress={() => router.push('/(tabs)/write/mood_select')}
        pressStyle={PRESS_STYLE}
      />
    </YStack>
  ) : (
    <YStack
      key={date}
      animation="quick"
      animateOnly={ENTER_STYLE_KEY}
      p="$6"
      justify="center"
      items="center"
      rounded="$8"
      gap="$3"
      enterStyle={ENTER_STYLE}
    >
      <Button
        unstyled
        icon={<NotebookPen size="$2" color="$gray10" />}
        onPress={() => toast.show(t('notifications.warning.journal.title'))}
      />
      <H3 color="$gray10">{t('common.fallback.empty.title')}</H3>
      <H5 color="$gray10">{t('common.fallback.empty.description')}</H5>
    </YStack>
  );
};
