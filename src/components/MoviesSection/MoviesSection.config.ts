import { RootState } from "@/store";
import { fetchPopularMovies, fetchUpcomingMovies } from "@/features/movies/moviesSlice";

export type MoviesSectionKey = "popular" | "upcoming";

type SectionConfig = {
  title: string;
  loadingText: string;
  selectMovies: (state: RootState) => RootState["movies"]["popular"];
  selectLoading: (state: RootState) => boolean;
  selectError: (state: RootState) => string | null;
  selectPage: (state: RootState) => number;
  selectTotalPages: (state: RootState) => number;
  fetchThunk: (page?: number) => ReturnType<typeof fetchPopularMovies> | ReturnType<typeof fetchUpcomingMovies>;
};

export const SECTION_CONFIG: Record<MoviesSectionKey, SectionConfig> = {
  popular: {
    title: 'Popular',
    loadingText: 'Loading Popular Movies...',
    selectMovies: state => state.movies.popular,
    selectLoading: state => state.movies.loadingPopular,
    selectError: state => state.movies.errorPopular,
    selectPage: state => state.movies.pagePopular,
    selectTotalPages: state => state.movies.totalPagesPopular,
    fetchThunk: page => fetchPopularMovies(page ?? 1),
  },
  upcoming: {
    title: 'Upcoming',
    loadingText: 'Loading Upcoming Movies...',
    selectMovies: state => state.movies.upcoming,
    selectLoading: state => state.movies.loadingUpcoming,
    selectError: state => state.movies.errorUpcoming,
    selectPage: state => state.movies.pageUpcoming,
    selectTotalPages: state => state.movies.totalPagesUpcoming,
    fetchThunk: page => fetchUpcomingMovies(page ?? 1),
  },
};
