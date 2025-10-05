import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import MoviesStackNavigator from '../movies/MoviesStackNavigator';
import FavoritesStackNavigator from '../favorites/FavoritesStackNavigator';

export type BottomTabsParamList = {
  MoviesTab: undefined;
  FavoritesTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();
const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const TabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={renderTabBar}>
      <Tab.Screen
        name="MoviesTab"
        component={MoviesStackNavigator}
        options={{ title: 'Movies' }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStackNavigator}
        options={{ title: 'Saved' }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
