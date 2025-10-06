import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPopularMovies } from '@/features/movies/moviesSlice';
import Loading from '@/components/common/Loading/Loading';
import TextError from '@/components/common/TextError/TextError';
import MovieCard from '@/components/MovieCard/MovieCard';
import { Movie, MovieDetails, MoviesStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { removeMovie, saveMovie } from '@/features/saved/savedSlice';
import { moviesApi } from '@/services/api/moviesApi';

const PopularMovies = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MoviesStackParamList>>();
  const dispatch = useAppDispatch();
  const {
    popular,
    pagePopular,
    loadingPopular,
    errorPopular,
    totalPagesPopular,
  } = useAppSelector(state => state.movies);
  const { items: savedItems } = useAppSelector(state => state.saved);

  const moviesData = useMemo(
    () => (popular ?? []).filter((m): m is Movie => !!m && !!m.id),
    [popular],
  );

  useEffect(() => {
    dispatch(fetchPopularMovies(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load more popular movies
  const handleLoadMorePopular = useCallback(() => {
    if (!loadingPopular && pagePopular < totalPagesPopular) {
      dispatch(fetchPopularMovies(pagePopular + 1));
    }
  }, [dispatch, loadingPopular, pagePopular, totalPagesPopular]);

  // Handle toggle save
  const handleToggleSave = async (id : number) => {
    const details = await moviesApi.details(id);
    if (savedItems[id]) {
      dispatch(removeMovie(id));
    } else {
      dispatch(saveMovie(details as MovieDetails));
    }
  };

  // Render movie item
  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => (
      <MovieCard
        movie={item}
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
        onPressSave={() => handleToggleSave(item.id)}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const isInitialLoading = loadingPopular && moviesData.length === 0;
  const isLoadingMore = loadingPopular && moviesData.length > 0;

  if (isInitialLoading) {
    return <Loading loadingText="Loading Popular Movies..." />;
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
        renderItem={renderMovieItem}
        onEndReached={handleLoadMorePopular}
        onEndReachedThreshold={0.7}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        nestedScrollEnabled
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        initialNumToRender={10}
        maxToRenderPerBatch={12}
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
  loaderFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
