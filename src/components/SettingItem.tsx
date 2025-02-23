import { Href, Link } from 'expo-router';
import { Label, View, XStack } from 'tamagui';
import { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  label: string;
  href: Href;
}

export const SettingItem = ({ icon, label, href }: Props) => {
  return (
    <Link href={href}>
      <XStack gap="$4" items="center" p="$4">
        {icon}
        <Label fontSize="$6" htmlFor={label}>
          {label}
        </Label>
        <View flex={1} />
      </XStack>
    </Link>
  );
};
