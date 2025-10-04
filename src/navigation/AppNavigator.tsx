import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabsNavigator from './TabsNavigator'

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <TabsNavigator />
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})