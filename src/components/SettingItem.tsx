import { Href, Link } from 'expo-router';
import { Button } from 'tamagui';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';

interface Props {
  icon?: any;
  label: string;
  href: Href;
}

export const SettingItem = ({ icon, label, href }: Props) => {
  return (
    <Link href={href} asChild>
      <Button
        unstyled
        animation="medium"
        animateOnly={PRESS_STYLE_KEY}
        icon={icon}
        flexDirection="row"
        rounded="$4"
        gap="$2"
        fontSize="$6"
        pressStyle={PRESS_STYLE}
        p="$5"
      >
        {label}
      </Button>
    </Link>
  );
};
