import { MovieDetails } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const STORAGE_KEY = "@saved_movies_v1";

export interface SavedState {
  items: Record<number, MovieDetails>;
  status: "idle" | "loading" | "error";
};

const initialState: SavedState = { 
    items: {}, 
    status: "idle" 
};

export const loadSaved = createAsyncThunk("saved/load", async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Record<number, MovieDetails>) : {};
});

export const persistSaved = createAsyncThunk(
  "saved/persist",
  async (items: Record<number, MovieDetails>) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  }
);

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    saveMovie(state, action: PayloadAction<MovieDetails>) {
      state.items[action.payload.id] = action.payload;
    },
    removeMovie(state, action: PayloadAction<number>) {
      delete state.items[action.payload];
    },
    clearAll(state) {
      state.items = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSaved.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadSaved.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "idle";
      })
      .addCase(loadSaved.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { saveMovie, removeMovie, clearAll } = savedSlice.actions;
export default savedSlice.reducer;
