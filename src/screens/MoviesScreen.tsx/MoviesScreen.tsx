import { Text, View } from 'react-native'
import React from 'react'
import MovieList from '@/components/MovieList/MovieList'

const MoviesScreen = () => {
  return (
    <View>
      <Text>ListMoviesScreen</Text>
      <MovieList />
    </View>
  )
}

export default MoviesScreen

