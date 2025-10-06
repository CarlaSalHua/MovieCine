import FavoriteScreen from '@/screens/FavoriteScreen/FavoriteScreen';
import MovieDetailScreen from '@/screens/MovieDetailScreen/MovieDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

type FavoritesStackParamList = {
  SavedHome: undefined;
  MovieDetail: { movieId: number };
};

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#171010' },
        headerStyle: { backgroundColor: '#171010' },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="SavedHome"
        component={FavoriteScreen}
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

export default FavoritesStackNavigator;
