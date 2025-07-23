import { View, type ViewProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  backgroundColorKey?: keyof typeof Colors.light | keyof typeof Colors.dark;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  backgroundColorKey = 'background',
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    backgroundColorKey
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
