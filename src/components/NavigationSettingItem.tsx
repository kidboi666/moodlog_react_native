import { Href, Link } from 'expo-router';
import { SettingsNavigationButton } from './NavigationSettingItem.styled';

interface NavigationSettingItemProps {
  icon?: React.ReactNode;
  label: string;
  href: Href;
  onNavigate?: () => void;
}

export const NavigationSettingItem = ({
  icon,
  label,
  href,
  onNavigate,
}: NavigationSettingItemProps) => {
  const handlePress = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <Link href={href} asChild onPress={handlePress}>
      <SettingsNavigationButton icon={icon}>{label}</SettingsNavigationButton>
    </Link>
  );
};
