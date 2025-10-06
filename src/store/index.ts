import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import moviesReducer from '@/features/movies/moviesSlice'
import savedReducer from '@/features/saved/savedSlice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    saved: savedReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()