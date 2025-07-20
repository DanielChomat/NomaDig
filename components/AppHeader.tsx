import { ReactElement, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

import { ThemedText } from './ThemedText';

const HEADER_HEIGHT = 48;

type AppHeaderProps = {
  title?: string;
  contentLeft?: ReactElement;
  contentRight?: ReactElement;
  isAbsolutePositioned?: boolean;
  shouldRenderSafeArea?: boolean;
  backgroundColor?: string;
};

export const AppHeader = ({
  title,
  contentLeft,
  contentRight,
  isAbsolutePositioned = false,
  shouldRenderSafeArea = true,
  backgroundColor,
}: AppHeaderProps) => {
  const { top } = useSafeAreaInsets();

  const containerStyle = useMemo(
    () => [
      styles.container,
      isAbsolutePositioned && styles.containerAbsolute,
      shouldRenderSafeArea && { paddingTop: top, height: HEADER_HEIGHT + top },
      !!backgroundColor && { backgroundColor },
    ],
    [isAbsolutePositioned, top, backgroundColor, shouldRenderSafeArea]
  );

  return (
    <View style={containerStyle}>
      <View style={[styles.sideContent, styles.sideContentLeft]}>
        {contentLeft}
      </View>
      {title && (
        <ThemedText
          type={'defaultSemiBold'}
          style={styles.title}
          lightColor={Colors.light.text}
          darkColor={Colors.light.text}
        >
          {title}
        </ThemedText>
      )}
      <View style={[styles.sideContent, styles.sideContentRight]}>
        {contentRight}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // If paddingVertical, does not get overwritten by the paddingTop
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerAbsolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    elevation: 1000,
  },
  sideContent: { width: '25%', flexDirection: 'row' },
  sideContentLeft: {
    justifyContent: 'flex-start',
  },
  sideContentRight: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    flex: 3,
    textAlign: 'center',
  },
});
