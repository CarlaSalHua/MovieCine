import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchUpcomingMovies } from '@/features/movies/moviesSlice';
import MovieCard from '@/components/MovieCard/MovieCard';
import Loading from '@/components/common/Loading/Loading';
import TextError from '@/components/common/TextError/TextError';

const UpcomingMovies = () => {
  const dispatch = useAppDispatch();
  const {
    upcoming,
    loadingUpcoming,
    pageUpcoming,
    errorUpcoming,
  } = useAppSelector(state => state.movies);

    useEffect(() => {
      dispatch(fetchUpcomingMovies(1));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const handleLoadMoreUpcoming = () => {
      dispatch(fetchUpcomingMovies(pageUpcoming + 1));
    }

    
  if (loadingUpcoming) {
    return (
      <Loading loadingText={loadingUpcoming && 'Loading Upcoming Movies...'} />
    );
  }

  if (errorUpcoming) {
    return <TextError textError={errorUpcoming} />;
  }

  return (
    <View style={styles.subContainer}>
        <Text style={styles.title}>Upcomming</Text>
        <FlatList
          data={upcoming}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          onEndReached={handleLoadMoreUpcoming}
          onEndReachedThreshold={0.7}
          renderItem={({ item }) => <MovieCard movie={item} />}
          style={styles.listSpacer}
        />
      </View>
  );
};

export default UpcomingMovies;

const styles = StyleSheet.create({
  subContainer: {
    marginTop: 32,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  listSpacer: {
    paddingLeft: 16
  }
});
