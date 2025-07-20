import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';

export const RouterCloseIcon = () => {
  const router = useRouter();

  return <X onPress={router.back} color={Colors.light.icon} />;
};
