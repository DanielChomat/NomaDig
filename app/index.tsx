import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Moon, Plus, SunMedium, Telescope } from 'lucide-react-native';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ParallaxScrollScreenLayout } from '@/components/ParallaxScrollScreenLayout';
import { ScreenLayout } from '@/components/ScreenLayout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TimezonesSelectedList } from '@/components/timezones/TimezonesSelectedList';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppStore } from '@/lib/store/appStore';
import { getCurrentTimezoneInfo } from '@/utils/timezoneHelpers';

export const HomeScreen = () => {
  const iconColor = useThemeColor({}, 'icon');

  const selectedTimezoneIds = useAppStore((state) => state.selectedTimezoneIds);
  const shouldShowMilitaryTime =
    useAppStore.getState().settings.militaryTime === true;

  const FooterElement = useMemo(
    () => (
      // ACTION BAR
      <ThemedView style={styles.actionBarContainer}>
        <Link href={'/addTimezone'}>
          <ThemedView>
            <Plus color={iconColor} size={24} />
          </ThemedView>
        </Link>
      </ThemedView>
    ),
    [iconColor]
  );

  const currentTimezoneInfo = useMemo(() => getCurrentTimezoneInfo(), []);

  const hasSelectedTimezones = selectedTimezoneIds.length > 0;

  if (hasSelectedTimezones) {
    return (
      <ScreenLayout includeTopSafeArea FooterElement={FooterElement}>
        <ThemedView
          style={{
            flex: 1,
            alignItems: 'center',
            paddingBlockStart: 24,
            gap: 32,
          }}
        >
          {/* CURRENT TIMEZONE */}
          <ThemedView style={{ gap: 12, alignItems: 'center' }}>
            <ThemedView style={styles.currentTimezoneContainer}>
              <ThemedText type={'ultraTitle'}>
                {currentTimezoneInfo.hours}
              </ThemedText>
              <ThemedText type={'ultraTitle'}>:</ThemedText>
              <ThemedText type={'ultraTitle'}>
                {currentTimezoneInfo.minutes}
              </ThemedText>
              {/* TODO: Make the AM/PM text not center aligned */}
              {!shouldShowMilitaryTime && currentTimezoneInfo.period && (
                <ThemedText
                  type={'subtitle'}
                  style={styles.currentTimeMilitaryTimeContainer}
                >
                  {currentTimezoneInfo.period}
                </ThemedText>
              )}
            </ThemedView>
            <ThemedView style={styles.currentTimezoneNameContainer}>
              <ThemedText type={'defaultSemiBold'}>
                {currentTimezoneInfo.cityName}
              </ThemedText>
              <ThemedText>{currentTimezoneInfo.gmtOffset}</ThemedText>
              {currentTimezoneInfo.isDaytime ? (
                <SunMedium color={iconColor} fill={iconColor} size={24} />
              ) : (
                <Moon color={iconColor} fill={iconColor} size={24} />
              )}
            </ThemedView>
          </ThemedView>
          <TimezonesSelectedList />
        </ThemedView>
      </ScreenLayout>
    );
  }

  return (
    <ParallaxScrollScreenLayout
      headerBackgroundColor={{
        light: Colors.light.headerBackgroundColor,
        dark: Colors.dark.headerBackgroundColor,
      }}
      headerImage={
        <Image
          source={require('@/assets/images/app-logo.png')}
          style={styles.reactLogo}
        />
      }
      headerRightElement={
        <Link href={'/(tabs)/explore'} asChild>
          <Telescope color={iconColor} size={24} />
        </Link>
      }
      FooterElement={FooterElement}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type={'title'}>Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type={'subtitle'}>No timezones yet</ThemedText>
        <ThemedText>
          Feel free to add your friend&apos;s timezones to find the best time to
          reconnect.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollScreenLayout>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 180,
    width: 180,
    bottom: '-6%',
    left: '-4%',
    position: 'absolute',
  },
  currentTimeMilitaryTimeContainer: {
    position: 'absolute',
    // Linked to gap of the container
    right: -12,
    transform: [{ translateX: '100%' }],
  },
  currentTimezoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,

    position: 'relative',
  },
  currentTimezoneNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  actionBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,

    flex: 1,

    borderRadius: 100,

    paddingHorizontal: 16,
    paddingVertical: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default HomeScreen;
