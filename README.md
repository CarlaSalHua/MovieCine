# MovieCine

MovieCine is a React Native application that helps you discover popular and upcoming movies, browse detailed information, and build a personal watchlist that syncs locally.

## Table of Contents
- [Setup](#setup)
- [Features](#features)
- [Navigation](#navigation)
- [Folder Structure](#folder-structure)
- [Architecture](#architecture)
- [Testing](#testing)
- [Technologies](#technologies)

## Setup
1. **Install dependencies**
   ```bash
   npm install  
   
   (use npm version > 10, node version > 20 )
   ```
2. **Environment variables**
   - Copy `.env.example` (or create `.env`) and provide your TMDB credentials, e.g.
     ```env
     TMDB_API_BASE=https://api.themoviedb.org/3
     TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
     TMDB_API_KEY=your_key_here
     TMDB_READ_TOKEN=your_token_here
     ```
3. **Run Metro bundler**
   ```bash
   npm start
   ```
4. **Run the app**
   ```bash
   npm run android   # or npm run ios
   ```

## Features
- **Movies list**: horizontal rails for Popular and Upcoming titles with infinite scroll.
- **Movie detail view**: trailers, runtime, genres, synopsis, and cast list.
- **Savedlist**: toggle movies between saved/unsaved state; persists locally with AsyncStorage.
- **Filters modal**: prepare for future filtering without leaving the main screen *(is not working yet).
- **Offline-friendly assets**: fallback poster image when the API lacks artwork.

## Navigation
MovieCine uses React Navigation with two levels:
- **Bottom Tabs (`TabsNavigator`)**
  - `MoviesTab`: entry point for browsing content.
  - `FavoritesTab`: displays the user savedlist.
- **Native Stack (`MoviesStackNavigator`)**
  - `MoviesHome`: `MoviesScreen` hosting the horizontal lists.
  - `MovieDetail`: full detail page. Stack navigation allows going back to the lists while preserving scroll position.

This structure keeps discovery and saved items separated while sharing stack transitions for detail screens.

## Folder Structure
```
MovieCine/
|-- android/
|-- ios/
|-- src/
|   |-- assets/
|   |   `-- images/
|   |-- components/
|   |   |-- common/
|   |   |   |-- Loading/
|   |   |   |-- SectionHeader/
|   |   |   `-- TextError/
|   |   |-- MovieCard/
|   |   |-- MovieFilters/
|   |   |-- MovieHorizontalList/
|   |   |-- MovieList/
|   |   |-- MoviesSection/
|   |   `-- SavedMovie/
|   |-- features/
|   |   |-- movies/
|   |   `-- saved/
|   |-- hooks/
|   |-- navigation/
|   |   |-- favorites/
|   |   |-- movies/
|   |   `-- tabBar/
|   |-- screens/
|   |   |-- FavoriteScreen/
|   |   |-- MovieDetailScreen/
|   |   `-- MoviesScreen/
|   |-- services/
|   |   |-- api/
|   |   `-- config/
|   |-- store/
|   `-- types/
`-- README.md
```
## Architecture
- **State management**: Redux Toolkit slices (`moviesSlice`, `savedSlice`). Async thunks orchestrate API calls and pagination.
- **Data flows**:
  - `useMoviesSection` hook encapsulates fetch, memoization, and pagination per rail.
  - `useSaveMovies` hook centralizes toggling logic and AsyncStorage persistence.
- **UI composition**: reusable components (`MovieHorizontalList`, `MovieCard`, `SectionHeader`) keep presentation separate from data orchestration.
- **Async persistence**: watchlist hydrates on app start (`loadSaved`) and writes through on every toggle (`persistSaved`).

## Testing (future updates)
- **Unit tests**: configured via Jest (`npm test`). Focus areas include hooks (e.g., `useMoviesSection`) and slices reducers.
- **Manual QA**: verify navigation flows, pagination, watchlist toggling, and offline poster fallback on both Android and iOS simulators.
- **Future work**: integrate React Native Testing Library for component interaction tests.

## Technologies
- React Native 0.81 + React 19 
- TypeScript 5
- Redux Toolkit & React Redux
- React Navigation (Bottom Tabs + Native Stack)
- Axios for HTTP requests
- AsyncStorage for local persistence
- React Native Gesture Handler & Reanimated for enhanced interactions

## Documentation
- https://reactnative.dev/docs/environment-setup
