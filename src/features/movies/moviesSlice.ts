import { moviesApi } from '@/services/api/moviesApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '@/types';

interface MoviesState {
  popular: Movie[];
  upcoming: Movie[];
  pagePopular: number;
  pageUpcoming: number;
  loadingPopular: boolean;
  loadingUpcoming: boolean;
  errorPopular: string | null;
  errorUpcoming: string | null;
  totalPagesPopular: number;
  totalPagesUpcoming: number
}

const initialState: MoviesState = {
  popular: [],
  upcoming: [],
  pagePopular: 1,
  pageUpcoming: 1,
  loadingPopular: false,
  loadingUpcoming: false,
  errorPopular: null,
  errorUpcoming: null,
  totalPagesPopular: 0,
  totalPagesUpcoming: 0
};

// Thunks
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const data = await moviesApi.popular(page);
      if (!data?.results) throw new Error('Invalid response from TMDB');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const data = await moviesApi.upcoming(page);
      if (!data?.results) throw new Error('Invalid response from TMDB');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetMovies: state => {
      state.popular = [];
      state.upcoming = [];
      state.pagePopular = 1;
      state.pageUpcoming = 1;
      state.loadingPopular = false;
      state.loadingUpcoming = false;
      state.errorPopular = null;
      state.errorUpcoming = null;
    },
  },
  extraReducers: builder => {
    builder
      // Popular
      .addCase(fetchPopularMovies.pending, state => {
        state.loadingPopular = true;
        state.errorPopular = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loadingPopular = false;
        state.totalPagesPopular = action.payload.total_pages;

        const { results, page, total_pages } = action.payload;
        if (!results) return;

        const combined = page === 1 ? results : [...state.popular, ...results];

        // Eliminar duplicados por ID
        const uniqueMovies = combined.filter(
          (movie, index, self) =>
            index === self.findIndex(m => m.id === movie.id),
        );

        state.popular = uniqueMovies;
        state.pagePopular = page < total_pages ? page : total_pages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loadingPopular = false;
        state.errorPopular =
          (action.payload as string) || 'Failed to load popular movies.';
      })

      // Upcoming
      .addCase(fetchUpcomingMovies.pending, state => {
        state.loadingUpcoming = true;
        state.errorUpcoming = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loadingUpcoming = false;
        state.totalPagesUpcoming = action.payload.total_pages;

        const { results, page, total_pages } = action.payload;
        if (!results) return;

        const combined = page === 1 ? results : [...state.upcoming, ...results];

        // Eliminar duplicados por ID
        const uniqueMovies = combined.filter(
          (movie, index, self) =>
            index === self.findIndex(m => m.id === movie.id),
        );

        state.upcoming = uniqueMovies;
        state.pageUpcoming = page < total_pages ? page : total_pages;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loadingUpcoming = false;
        state.errorUpcoming =
          (action.payload as string) || 'Failed to load upcoming movies.';
      });
  },
});

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
