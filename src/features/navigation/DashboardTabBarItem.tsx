import { ViewStyle } from 'react-native'
import { YStack } from 'tamagui'

import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import { NavigationRoute, ParamListBase, useLinkBuilder } from '@react-navigation/native'

type Props = { route: NavigationRoute<ParamListBase, string>; focused: boolean } & Pick<
  BottomTabBarProps,
  'descriptors' | 'navigation'
>

const getItemLabel = (options: BottomTabNavigationOptions, routeName: string) => {
  if (options.tabBarLabel !== undefined) return options.tabBarLabel
  if (options.title !== undefined) return options.title
  return routeName
}

export const DashboardTabBarItem = ({ route, focused, descriptors, navigation }: Props) => {
  const { buildHref } = useLinkBuilder()

  const { key: routeKey, name: routeName } = route

  const { options } = descriptors[routeKey]

  const icon = options?.tabBarIcon?.({
    focused,
    size: 0,
    color: 'black',
  })

  const label = getItemLabel(options, routeName)

  const href = buildHref(routeName, route.params)
  const accessibilityState = focused ? { selected: true } : {}
  const { tabBarAccessibilityLabel, tabBarButtonTestID } = options

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    })

    const canNavigateToScreen = !focused && !event.defaultPrevented

    if (canNavigateToScreen) {
      navigation.navigate(routeName, route.params)
    }
  }

  const onLongPress = () =>
    navigation.emit({
      type: 'tabLongPress',
      target: routeKey,
    })

  const focusedItemContainerStyles: ViewStyle = { backgroundColor: 'yellow' }

  return (
    <PlatformPressable
      href={href}
      accessibilityState={accessibilityState}
      accessibilityLabel={tabBarAccessibilityLabel}
      testID={tabBarButtonTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        {
          justifyContent: 'center',
          aspectRatio: 1,
          borderRadius: 100,
          padding: 8,
        },
        focused && focusedItemContainerStyles,
      ]}
    >
      <YStack alignItems={'center'} gap={4}>
        {icon}
        {/* TODO: Add possibility to show label into settings? */}
        {/*<Text fontSize={"$3"} fontWeight={'400'}>*/}
        {/*    {label}*/}
        {/*</Text>*/}
      </YStack>
    </PlatformPressable>
  )
}
