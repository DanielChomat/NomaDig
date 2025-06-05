import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

export type ThemedButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const ThemedButton = ({
  title,
  icon,
  style,
  ...props
}: ThemedButtonProps) => {
  const backgroundColor = useThemeColor(
    {
      light: Colors.light.background,
      dark: Colors.dark.background,
    },
    'background'
  );

  return (
    <Pressable
      {...props}
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor,
          borderRadius: 16,
        },
        style,
      ]}
    >
      {icon}
      <ThemedText>{title}</ThemedText>
    </Pressable>
  );
};
