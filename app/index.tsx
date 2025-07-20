import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Telescope } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ParallaxScrollScreenLayout } from '@/components/ParallaxScrollScreenLayout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export const HomeScreen = () => {
  const iconColor = useThemeColor({}, 'icon');

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
