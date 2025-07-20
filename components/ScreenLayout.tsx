import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from './ThemedView';

const FOOTER_HEIGHT = 68;

export type ScreenLayoutProps = PropsWithChildren<{
  includeBottomSafeArea?: boolean;
  includeTopSafeArea?: boolean;
  FooterElement?: ReactNode;
}>;

export const ScreenLayout = ({
  children,
  includeBottomSafeArea = true,
  includeTopSafeArea = false,
  FooterElement,
}: ScreenLayoutProps) => {
  const { top, bottom } = useSafeAreaInsets();

  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        paddingBottom: includeBottomSafeArea ? bottom : 0,
        paddingTop: includeTopSafeArea ? top : 0,
      },
    ],
    [includeBottomSafeArea, includeTopSafeArea, bottom, top]
  );

  const footerStyle = useMemo(
    () => [
      styles.footer,
      { paddingBottom: bottom, height: FOOTER_HEIGHT + bottom },
    ],
    [bottom]
  );

  return (
    <>
      <ThemedView style={containerStyle}>{children}</ThemedView>

      {FooterElement && (
        <ThemedView style={footerStyle}>{FooterElement}</ThemedView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer: {
    paddingTop: 12,
    paddingHorizontal: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
