import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ListMoviesScreen from '@/screens/ListMoviesScreen';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#E50914', tabBarStyle: { backgroundColor: '#1a1414' } }}>
        <Tab.Screen name='MoviesTab' component={ListMoviesScreen} options={{ tabBarLabel: 'Películas'}} />
    </Tab.Navigator>
  )
}

export default TabsNavigator

const styles = StyleSheet.create({})