import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPopularMovies } from '@/features/movies/moviesSlice';
import Loading from '@/components/common/Loading/Loading';
import TextError from '@/components/common/TextError/TextError';
import MovieCard from '@/components/MovieCard/MovieCard';
import { Movie } from '@/types';

const PopularMovies = () => {
  const dispatch = useAppDispatch();
  const { popular, pagePopular, loadingPopular, errorPopular, totalPagesPopular } = useAppSelector(
    state => state.movies,
  );

  // Filter out movies that don't have an id or duplicates
  const moviesData = useMemo(
    () => (popular ?? []).filter((m): m is Movie => !!m && !!m.id),
    [popular],
  );

  useEffect(() => {
    dispatch(fetchPopularMovies(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMorePopular = useCallback(() => {
    if (!loadingPopular && pagePopular <  totalPagesPopular) {
      dispatch(fetchPopularMovies(pagePopular + 1));
    }
  }, [dispatch, loadingPopular, pagePopular, totalPagesPopular]);

  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => <MovieCard movie={item} />,
    [],
  );

  if (loadingPopular) {
    return (
      <Loading loadingText={loadingPopular && 'Loading Popular Movies...'} />
    );
  }

  if (errorPopular) {
    return <TextError textError={errorPopular} />;
  }

  return (
    <View>
      <Text style={styles.title}>Popular</Text>
      <FlatList
        data={moviesData}
        keyExtractor={item => item.id.toString()}
        horizontal
        initialNumToRender={10}
        maxToRenderPerBatch={12}
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        onEndReached={handleLoadMorePopular}
        onEndReachedThreshold={0.7}
        renderItem={renderMovieItem}
        style={styles.listSpacer}
        nestedScrollEnabled
      />
    </View>
  );
};

export default React.memo(PopularMovies);

const styles = StyleSheet.create({
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
});
