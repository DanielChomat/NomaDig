import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  ultraTitle: {
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 64,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});

const TEXT_TYPE_STYLES_MAP = {
  default: styles.default,
  title: styles.title,
  ultraTitle: styles.ultraTitle,
  defaultSemiBold: styles.defaultSemiBold,
  subtitle: styles.subtitle,
  link: styles.link,
};

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | 'default'
    | 'title'
    | 'ultraTitle'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text style={[{ color }, TEXT_TYPE_STYLES_MAP[type], style]} {...rest} />
  );
}
