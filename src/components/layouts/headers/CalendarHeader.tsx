import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { Button, H1, Text, XStack } from 'tamagui';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { WEEK_DAY } from '@/constants/date';
import { useTranslation } from 'react-i18next';

export const CalendarHeader = () => {
  const { t } = useTranslation();
  return (
    <HeaderContainer flexDirection="column" items="stretch" gap="$2">
      <XStack justify="space-between" items="center">
        <Button bg="transparent" icon={<ArrowLeft size="$1" />} />
        <H1 fontSize="$8">2025</H1>
        <Button bg="transparent" icon={<ArrowRight size="$1" />} />
      </XStack>
      <XStack justify="space-between" px={36}>
        {Object.keys(WEEK_DAY).map((week, i) => (
          <Text key={i}>{t(`calendar.days.${week}`)}</Text>
        ))}
      </XStack>
    </HeaderContainer>
  );
};
