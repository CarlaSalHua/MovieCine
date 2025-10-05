import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Heart } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

type IconName = 'MoviesTab' | 'FavoritesTab';

const ICONS: Record<IconName, React.ElementType> = {
  MoviesTab: Home,
  FavoritesTab: Heart,
};

type TabItemProps = {
  route: any;
  isFocused: boolean;
  label: string;
  Icon: React.ElementType;
  onPress: () => void;
};

function TabItem({ route, isFocused, label, Icon, onPress }: TabItemProps) {
  const iconColor = isFocused ? '#d80c08ff' : '#7f8c8d';
  const scale = useSharedValue(isFocused ? 1.2 : 1);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.2 : 1, {
      damping: 10,
      stiffness: 150,
    });
  }, [isFocused, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      key={route.key}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      style={styles.tabButton}
      activeOpacity={0.8}
    >
      <Animated.View style={animatedStyle}>
        <Icon color={iconColor} size={24} />
      </Animated.View>
      <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel ?? options.title ?? route.name.replace('Tab', '');
        const isFocused = state.index === index;

        const Icon = ICONS[route.name as IconName] ?? Home;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name as never);
          }
        };

        return (
          <TabItem
            key={route.key}
            route={route}
            isFocused={isFocused}
            label={label as string}
            Icon={Icon}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0f0f0f',
    paddingVertical: Platform.OS === 'ios' ? 18 : 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: '#222',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
