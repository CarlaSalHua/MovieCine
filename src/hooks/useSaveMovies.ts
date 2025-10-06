import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { persistSaved, removeMovie, saveMovie } from "@/features/saved/savedSlice";
import { moviesApi } from "@/services/api/moviesApi";
import { MovieDetails } from "@/types";

export function useSaveMovies() {
  const dispatch = useAppDispatch();
  const { items: savedItems } = useAppSelector((s) => s.saved);

  const toggleSave = useCallback(
    async (id: number, details?: MovieDetails | null) => {
      if (savedItems[id]) {
        const nextItems = { ...savedItems };
        delete nextItems[id];
        dispatch(removeMovie(id));
        dispatch(persistSaved(nextItems));
        return;
      }

      const movieDetails = details ?? (await moviesApi.details(id));
      const nextItems = { ...savedItems, [id]: movieDetails as MovieDetails };
      dispatch(saveMovie(movieDetails as MovieDetails));
      dispatch(persistSaved(nextItems));
    },
    [dispatch, savedItems]
  );

  return { toggleSave, savedItems };
}
