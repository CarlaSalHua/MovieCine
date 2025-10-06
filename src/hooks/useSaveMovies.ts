import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeMovie, saveMovie } from "@/features/saved/savedSlice";
import { moviesApi } from "@/services/api/moviesApi";
import { MovieDetails } from "@/types";

export function useSaveMovies() {
  const dispatch = useAppDispatch();
  const { items: savedItems } = useAppSelector((s) => s.saved);

  const toggleSave = useCallback(async (id: number) => {
    if (savedItems[id]) {
      dispatch(removeMovie(id));
      return;
    }
    const details = await moviesApi.details(id);
    dispatch(saveMovie(details as MovieDetails));
  }, [dispatch, savedItems]);

  return { toggleSave, savedItems };
}