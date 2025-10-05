import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import ListMoviesScreen from '@/screens/MoviesScreen.tsx/ListMoviesScreen';
import CustomTabBar from './CustomTabBar';

export type BottomTabsParamList = {
  MoviesTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();
const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const TabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={renderTabBar}>
      <Tab.Screen
        name="MoviesTab"
        component={ListMoviesScreen}
        options={{ title: 'Películas' }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
