import { Text, View, FlatList } from 'react-native'
import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import { styles } from './MovieList.styles'

const dataPrueba = [
  {
    id: 1,
    title: 'Pelicula hola',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5
  },
  {
    id: 2,
    title: 'Pelicula holaefefe',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5
  },
  {
    id: 3,
    title: 'Pelicula hola',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5
  },
]


const MovieList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tendencias</Text>
      <FlatList 
        data={dataPrueba}
        keyExtractor={item => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard 
            movie={item}
          />
        )}
      />
    </View>
  )
}

export default MovieList