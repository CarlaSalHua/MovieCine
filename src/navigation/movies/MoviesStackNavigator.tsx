import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesScreen from '@/screens/MoviesScreen.tsx/MoviesScreen';

const Stack = createNativeStackNavigator();

const MoviesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#171010' },
        headerStyle: { backgroundColor: '#171010' },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="MoviesHome"
        component={MoviesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MoviesStackNavigator;
