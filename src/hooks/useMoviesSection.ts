import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Movie } from "@/types";
import { MoviesSectionKey, SECTION_CONFIG } from "@/components/MoviesSection/MoviesSection.config";


export function useMoviesSection(section: MoviesSectionKey) {
  const dispatch = useAppDispatch();
  const {
    title,
    loadingText,
    selectMovies,
    selectLoading,
    selectError,
    selectPage,
    selectTotalPages,
    fetchThunk,
  } = SECTION_CONFIG[section];

  const movies   = useAppSelector(selectMovies);
  const loading  = useAppSelector(selectLoading);
  const error    = useAppSelector(selectError);
  const page     = useAppSelector(selectPage);
  const total    = useAppSelector(selectTotalPages);

  const moviesData = useMemo(
    () => (movies ?? []).filter((m): m is Movie => !!m && !!m.id),
    [movies]
  );

  useEffect(() => {
    // carga inicial
    dispatch(fetchThunk(1));
  }, [dispatch, fetchThunk]);

  const loadMore = useCallback(() => {
    if (!loading && page < total) {
      dispatch(fetchThunk(page + 1));
    }
  }, [dispatch, fetchThunk, loading, page, total]);

  const isInitialLoading = loading && moviesData.length === 0;
  const isLoadingMore    = loading && moviesData.length > 0;

  return {
    title,
    loadingText,
    moviesData,
    loading,
    error,
    isInitialLoading,
    isLoadingMore,
    loadMore,
  };
}
