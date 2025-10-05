import { StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import TabsNavigator from './tabBar/TabsNavigator'

const AppNavigator = () => {
    const isDarkMode = useColorScheme() !== 'dark'
    const navigationTheme = isDarkMode ? DarkTheme : DefaultTheme

    return (
        <NavigationContainer theme={navigationTheme}>
            <StatusBar
                barStyle={isDarkMode ? "light-content" : 'dark-content'}
                backgroundColor={navigationTheme.colors.background}
            />
            <TabsNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator
