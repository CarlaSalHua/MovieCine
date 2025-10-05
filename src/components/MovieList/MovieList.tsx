import { Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import { styles } from './MovieList.styles'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchPopularMovies } from '@/features/movies/moviesSlice'

const MovieList = () => {
    const dispatch = useAppDispatch();
    const { popular, pagePopular } = useAppSelector(state => state.movies);
  
    useEffect(() => {
      dispatch(fetchPopularMovies(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const handleLoadMore = () => {
      dispatch(fetchPopularMovies(pagePopular + 1));
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tendencias</Text>
      <FlatList 
        data={popular}
        keyExtractor={(item, index) => String(item.id-index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}
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