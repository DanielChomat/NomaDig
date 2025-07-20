import { type PropsWithChildren, type ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

import { AppHeader } from './AppHeader';
import { ScreenLayout, ScreenLayoutProps } from './ScreenLayout';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<
  {
    headerImage: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
    headerRightElement?: ReactElement;
    headerLeftElement?: ReactElement;
  } & Pick<ScreenLayoutProps, 'FooterElement'>
>;

export const ParallaxScrollScreenLayout = ({
  children,
  headerImage,
  headerBackgroundColor,
  headerRightElement,
  headerLeftElement,
  FooterElement,
}: Props) => {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { bottom } = useSafeAreaInsets();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const showHeaderText = !!headerLeftElement || !!headerRightElement;

  return (
    <ScreenLayout FooterElement={FooterElement}>
      {showHeaderText && (
        <AppHeader
          contentLeft={headerLeftElement}
          contentRight={headerRightElement}
          isAbsolutePositioned
        />
      )}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
