import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesScreen from '@/screens/MoviesScreen/MoviesScreen';
import MovieDetailScreen from '@/screens/MovieDetailScreen/MovieDetailScreen';

type MoviesStackParamList = {
  MoviesHome: undefined;
  MovieDetail: { movieId: number };
};

const Stack = createNativeStackNavigator<MoviesStackParamList>();

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
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MoviesStackNavigator;
