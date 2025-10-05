import { moviesApi } from "@/services/api/moviesApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "@/types";

interface MoviesState {
  popular: Movie[];
  upcoming: Movie[];
  pagePopular: number;
  pageUpcoming: number;
  loadingPopular: boolean;
  loadingUpcoming: boolean;
  errorPopular: string | null;
  errorUpcoming: string | null;
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
};

// Thunks
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const data = await moviesApi.popular(page);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const data = await moviesApi.upcoming(page);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetMovies: (state) => {
      state.popular = [];
      state.upcoming = [];
      state.pagePopular = 1;
      state.pageUpcoming = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular
    .addCase(fetchPopularMovies.pending, (state) => {
      state.loadingPopular = true;
      state.errorPopular = null;
    })
    .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        console.log('action ==>',action.payload);
      state.loadingPopular = false;
      state.popular = [...state.popular, ...action.payload.results];
      state.pagePopular = action.payload.page;
    })
    .addCase(fetchPopularMovies.rejected, (state, action) => {
      state.loadingPopular = false;
      state.errorPopular =
        (action.payload as string) || "Failed to load popular movies.";
    })

    // Upcoming
    .addCase(fetchUpcomingMovies.pending, (state) => {
      state.loadingUpcoming = true;
      state.errorUpcoming = null;
    })
    .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
      state.loadingUpcoming = false;
      state.upcoming = [...state.upcoming, ...action.payload.results];
      state.pageUpcoming = action.payload.page;
    })
    .addCase(fetchUpcomingMovies.rejected, (state, action) => {
      state.loadingUpcoming = false;
      state.errorUpcoming =
        (action.payload as string) || "Failed to load upcoming movies.";
    });
  },
});

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;