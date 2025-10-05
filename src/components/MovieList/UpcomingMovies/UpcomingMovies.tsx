import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchUpcomingMovies } from '@/features/movies/moviesSlice';
import MovieCard from '@/components/MovieCard/MovieCard';
import Loading from '@/components/common/Loading/Loading';
import TextError from '@/components/common/TextError/TextError';
import { Movie, MoviesStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const UpcomingMovies = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MoviesStackParamList>>();
  const dispatch = useAppDispatch();
  const {
    upcoming,
    loadingUpcoming,
    pageUpcoming,
    errorUpcoming,
    totalPagesUpcoming,
  } = useAppSelector(state => state.movies);

  const upcomingData = useMemo(
    () => (upcoming ?? []).filter((m): m is Movie => !!m && !!m.id),
    [upcoming],
  );

  useEffect(() => {
    dispatch(fetchUpcomingMovies(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMoreUpcoming = useCallback(() => {
    if (!loadingUpcoming && pageUpcoming < totalPagesUpcoming) {
      dispatch(fetchUpcomingMovies(pageUpcoming + 1));
    }
  }, [dispatch, loadingUpcoming, pageUpcoming, totalPagesUpcoming]);

  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => (
      <MovieCard
        movie={item}
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const isInitialLoading = loadingUpcoming && upcomingData.length === 0;
  const isLoadingMore = loadingUpcoming && upcomingData.length > 0;

  if (isInitialLoading) {
    return <Loading loadingText="Loading Upcoming Movies..." />;
  }

  if (errorUpcoming) {
    return <TextError textError={errorUpcoming} />;
  }

  return (
    <View style={styles.subContainer}>
      <Text style={styles.title}>Upcoming</Text>
      <FlatList
        data={upcomingData}
        keyExtractor={item => item.id.toString()}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        onEndReached={handleLoadMoreUpcoming}
        onEndReachedThreshold={0.7}
        renderItem={renderMovieItem}
        style={styles.listSpacer}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.loaderFooter}>
              <ActivityIndicator size="small" color="#E50914" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default React.memo(UpcomingMovies);

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
    paddingLeft: 16,
  },
  loaderFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
